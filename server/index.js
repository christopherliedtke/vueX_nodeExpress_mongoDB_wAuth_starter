const express = require("express");
const app = express();

const cors = require("cors");
const compression = require("compression");

const csurf = require("csurf");
// const cryptoRandomString = require("crypto-random-string");

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

// #Passport
require("./utils/passport");

// #Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

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
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
