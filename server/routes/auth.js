const express = require("express");
const router = express.Router();
const { User } = require("../utils/models/user");
const { hash, compare } = require("../utils/bcrypt");
const passport = require("passport");

// #route:  POST /Login
// #desc:   Login a user
// #access: Public
router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log("req.body: ", req.body);
    console.log("req.user: ", req.user);

    res.json({ success: true });
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
    if (password.length < 6) {
        errors.push({ msg: "Your password should be at least 6 characters." });
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

                console.log("req.user before: ", req.user);
                // passport.serializeUser((user, done) => {
                //     done(null, user.id);
                // });
                console.log("req.user after: ", req.user);

                res.json({ success: true });
            }
        } catch (err) {
            console.log("Error on /register: ", err);
            errors.push({
                msg: "Oh, something went wrong. Please try again!",
            });
            res.json({ success: false, errors });
        }
    }
});

module.exports = router;
