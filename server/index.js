const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const path = require("path");

const app = express();

let secrets, port;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
    port = process.env.PORT;
} else {
    secrets = require("./utils/secrets");
    port = 5000;
}

// #mongoDB
const db = require("./utils/db");
const { User } = require("./utils/models/user");

// #Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(
    cookieSession({
        secret: secrets.COOKIE_SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(csurf());
app.use((req, res, next) => {
    res.set("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

// #Routes
const auth = require("./routes/api/auth");
app.use("/api/auth", auth);

// #Handle Production
if (process.env.NODE_ENV == "production") {
    app.use(express.static(__dirname + "/public"));
    app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
}
// else {
//     const publicRoot = '/mnt/d/dev/projects/jobs_mfa-mal-anders/client/public/';
//     app.use(express.static(path.join(__dirname, '../client/public')));
//     // app.use(express.static(publicRoot));
//     app.get('*', (req, res) => res.sendFile(path.join(publicRoot, 'index.html')));
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));
