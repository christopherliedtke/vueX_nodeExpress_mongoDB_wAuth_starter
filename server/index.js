const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const csurf = require("csurf");
const jwt = require("jsonwebtoken");
// const cookieSession = require("cookie-session");
// const path = require("path");

const cryptoRandomString = require("crypto-random-string");
const { hash, compare } = require("./utils/bcrypt");

const { User } = require("./utils/models/user");

let secrets, port;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
    port = process.env.PORT;
} else {
    secrets = require("./utils/secrets");
    port = 5000;
}

// #mongoDB
require("./utils/db");

// #Middleware
const checkAuthToken = require("./utils/middleware/authToken");
const requireLogin = require("./utils/middleware/requireLogin");
const requireAdmin = require("./utils/middleware/requireAdmin");
app.use(compression());
app.use(cors());
app.use(express.json());
// app.use(
//     cookieSession({
//         secret: secrets.COOKIE_SESSION_SECRET,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );
app.use(checkAuthToken);

// #CSRF for Production
if (process.env.NODE_ENV == "production") {
    app.use(csurf());
    app.use((req, res, next) => {
        res.set("x-frame-options", "DENY");
        res.cookie("mytoken", req.csrfToken());
        next();
    });
}

// #Routes
// const auth = require("./routes/api/auth");
// app.use("/api/auth", auth);

// #route:  POST /login
// #desc:   Login a user
// #access: Public
app.post("/api/auth/login", async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });

        if (user.length === 0) {
            res.json({ success: false });
        } else {
            try {
                const pwCheckSuccess = await compare(
                    req.body.password,
                    user[0].password
                );

                if (pwCheckSuccess) {
                    const token = jwt.sign(
                        { userId: user[0]._id, role: user[0].role },
                        secrets.JWT_SECRET,
                        {
                            expiresIn: 60 * 60 * 24 * 14,
                        }
                    );

                    res.json({
                        success: true,
                        userId: user[0]._id,
                        role: user[0].role,
                        token,
                    });
                } else {
                    console.log("-----> Password does not match!");
                    res.json({ success: false });
                }
            } catch (err) {
                console.log("Error on compare(): ", err);
                res.json({ success: false });
            }
        }
    } catch (err) {
        console.log("Error on User.find(): ", err);
        res.json({ success: false });
    }
});

// #route:  POST /register
// #desc:   Register a new user
// #access: Public
app.post("/apu/auth/register", async (req, res) => {
    try {
        const hashedPw = await hash(req.body.password);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPw,
            role: "admin",
            accepted: true,
        });

        const user = await newUser.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            secrets.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24 * 14,
            }
        );

        res.json({
            success: true,
            userId: user._id,
            role: user.role,
            token,
        });
    } catch (err) {
        console.log("Error on newUser.save(): ", err);
        res.json({ success: false });
    }
});

// #route:  GET /api/jobs
// #desc:   Get all jobs
// #access: Public
app.get("/api/jobs", requireLogin, requireAdmin, async (req, res) => {
    res.json({
        jobs: [
            { id: 1, title: "Job 1" },
            { id: 2, title: "Job 2" },
        ],
    });
});

// #Handle Production
if (process.env.NODE_ENV == "production") {
    app.use(express.static(__dirname + "/public"));
    app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
} else {
    app.use(express.static(__dirname + "/public"));
    app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
