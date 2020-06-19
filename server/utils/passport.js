const mongoose = require("mongoose");
const { User } = require("./models/user");
const { hash, compare } = require("./bcrypt");
const jwt = require("jsonwebtoken");

const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email: email });

                    if (!user) {
                        return done(null, false, {
                            msg: "This email is not registered.",
                        });
                    }

                    const pwCheckSuccess = await compare(
                        password,
                        user.password
                    );

                    if (pwCheckSuccess) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            msg: "The password is incorrect.",
                        });
                    }
                } catch (err) {
                    console.log("Error on User.findOne(): ", err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
