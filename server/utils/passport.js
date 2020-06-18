const { hash, compare } = require("./bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./models/user");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, cb) => {}
    )
);
