const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../utils/models/user");
const { hash, compare } = require("../utils/bcrypt");

// #route:  POST /Login
// #desc:   Login a user
// #access: Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    if (!email || !password) {
        errors.push({ msg: "Please fill in all fields!" });
        res.json({ success: false, errors });
    } else {
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                errors.push({ msg: "The provided email is not registered." });
                res.json({ success: false, errors });
            } else {
                const pwCheckSuccess = await compare(password, user.password);

                if (!pwCheckSuccess) {
                    errors.push({ msg: "Email and password do not match." });
                    res.json({ success: false, errors });
                } else {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userRole: user.role,
                        },
                        res.locals.secrets.JWT_SECRET,
                        {
                            expiresIn: 60 * 60 * 24 * 14,
                        }
                    );

                    req.session.token = token;
                    req.session.userId = user._id;

                    res.json({
                        success: true,
                        userRole: user.role,
                        userId: user._id,
                    });
                }
            }
        } catch (err) {
            console.log("Error on /api/auth/login: ", err);
            res.json({ success: false });
        }
    }
});

// #route:  POST /register
// #desc:   Register a new user
// #access: Public
router.post("/register", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        password2,
        acceptance,
    } = req.body;
    let errors = [];

    // Check if data is correctly provided
    if (!firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields!" });
    }
    if (password != password2) {
        errors.push({ msg: "The passwords you entered do not match!" });
    }
    if (
        !password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
        )
    ) {
        errors.push({
            msg:
                "Your password must be at least 6 characters and contain a lowercase letter, an uppercase letter, a numeric digit and a special character.",
        });
    }
    if (acceptance != "accepted") {
        errors.push({ msg: "You need to accept the terms of use." });
    }

    if (errors.length > 0) {
        res.json({ success: false, errors });
    } else {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                errors.push({
                    msg: "The provided email is registered already.",
                });
                res.json({ success: false, errors });
            } else {
                const hashedPw = await hash(password);

                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPw,
                    role: "basic",
                    accepted: true,
                });

                const user = await newUser.save();
                console.log("user: ", user);

                const token = jwt.sign(
                    {
                        userId: user._id,
                        userRole: user.role,
                    },
                    res.locals.secrets.JWT_SECRET,
                    {
                        expiresIn: 60 * 60 * 24 * 14,
                    }
                );

                req.session.token = token;
                req.session.userId = user._id;

                res.json({
                    success: true,
                    userRole: user.role,
                    userId: user._id,
                });
            }
        } catch (err) {
            console.log("Error on /api/auth/register: ", err);
            errors.push({
                msg: "Oh, something went wrong. Please try again!",
            });
            res.json({ success: false, errors });
        }
    }
});

// #route:  POST /logout
// #desc:   Logout a user
// #access: Public
router.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

module.exports = router;
