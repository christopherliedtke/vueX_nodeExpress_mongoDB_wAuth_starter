const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const { User } = require("../utils/models/user");
const { Code } = require("../utils/models/pwReset");
const { hash, compare } = require("../utils/bcrypt");
const emailService = require("../utils/nodemailer");

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
                        userStatus: user.status,
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
        errors.push({ msg: "The entered passwords do not match!" });
    }
    if (
        !password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/
        )
    ) {
        errors.push({
            msg:
                "Your password must be at least 6 characters long and contain a lowercase letter, an uppercase letter, a numeric digit and a special character.",
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
                    accepted: true,
                });

                const user = await newUser.save();
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
                    userStatus: user.status,
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

// #route:  POST /password-reset/get-code
// #desc:   Reset password of user
// #access: Public
router.post("/password-reset/get-code", async (req, res) => {
    const { email } = req.body;
    let errors = [];

    if (!email) {
        errors.push({ msg: "Please provide your registered email address!" });
        res.json({ success: false, errors });
    } else {
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                errors.push({
                    msg: "The provided email address is not registered!",
                });
                res.json({ success: false, errors });
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                const newCode = new Code({
                    code: secretCode,
                    email: email,
                });
                await newCode.save();

                const data = {
                    from: `YOUR NAME <${res.locals.secrets.EMAIL_USERNAME}>`,
                    to: email,
                    subject: "Your Password Reset Code for YOUR APP",
                    text: `Please use the following code within the next 10 minutes to reset your password on YOUR APP: ${secretCode}`,
                    html: `<p>Please use the following code within the next 10 minutes to reset your password on YOUR APP: <strong>${secretCode}</strong></p>`,
                };
                await emailService.sendMail(data);

                res.json({ success: true });
            }
        } catch (err) {
            console.log("Error on /api/auth/password-reset/get-code: ", err);
            errors.push({
                msg: "Oh, something went wrong. Please try again!",
            });
            res.json({ success: false, errors });
        }
    }
});

// #route:  POST /password-reset/verify
// #desc:   Verify and save new password of user
// #access: Public
router.post("/password-reset/verify", async (req, res) => {
    const { email, password, password2, code } = req.body;
    let errors = [];

    if (!email || !password || !password2 || !code) {
        errors.push({ msg: "Please fill in all fields!" });
    }
    if (password != password2) {
        errors.push({ msg: "The entered passwords do not match!" });
    }
    if (
        !password.match(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/
        )
    ) {
        errors.push({
            msg:
                "Your password must be at least 6 characters long and contain a lowercase letter, an uppercase letter, a numeric digit and a special character.",
        });
    }
    if (errors.length > 0) {
        res.json({ success: false, errors });
    } else {
        try {
            const response = await Code.findOne({ email, code });

            if (response.length === 0) {
                errors.push({
                    msg:
                        "The entered code is not correct. Please make sure to enter the code in the requested time interval.",
                });
                res.json({ success: false, errors });
            } else {
                const newHashedPw = await hash(password);
                await User.updateOne({ email }, { password: newHashedPw });
                await Code.deleteOne({ email, code });
                res.json({ success: true });
            }
        } catch (err) {
            console.log("Error on /api/auth/password-reset/verify: ", err);
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
