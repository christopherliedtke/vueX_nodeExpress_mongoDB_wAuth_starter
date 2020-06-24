const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const { User } = require("../utils/models/user");
const { Code } = require("../utils/models/secretCode");
const { hash, compare } = require("../utils/bcrypt");
const emailService = require("../utils/nodemailer");
const authenticateTokenWhilePending = require("../utils/middleware/checkAuthWhilePending");
const authenticateToken = require("../utils/middleware/checkAuth");

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
                            userStatus: user.status,
                        },
                        res.locals.secrets.JWT_SECRET,
                        {
                            expiresIn: 60 * 60 * 24 * 14,
                        }
                    );

                    req.session.token = token;

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
                        userStatus: user.status,
                    },
                    res.locals.secrets.JWT_SECRET,
                    {
                        expiresIn: 60 * 60 * 24 * 14,
                    }
                );

                req.session.token = token;

                const baseUrl = req.protocol + "://" + req.get("host");
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                const newCode = new Code({
                    code: secretCode,
                    email: user.email,
                });
                await newCode.save();

                const data = {
                    from: `YOUR NAME <${res.locals.secrets.EMAIL_USERNAME}>`,
                    to: user.email,
                    subject: "Your Activation Link for YOUR APP",
                    text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}`,
                    html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}" target="_blank">Email bestätigen</a></strong></p>`,
                };
                await emailService.sendMail(data);

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

// #route:  GET /verification/get-activation-email
// #desc:   Send activation email to registered users email address
// #access: Private
router.get(
    "/verification/get-activation-email",
    authenticateTokenWhilePending,
    async (req, res) => {
        const baseUrl = req.protocol + "://" + req.get("host");

        try {
            const user = await User.findById(req.userId);

            if (!user) {
                res.json({ success: false });
            } else {
                await Code.deleteMany({ email: user.email });

                const secretCode = cryptoRandomString({
                    length: 6,
                });
                const newCode = new Code({
                    code: secretCode,
                    email: user.email,
                });
                await newCode.save();

                const data = {
                    from: `YOUR NAME <${res.locals.secrets.EMAIL_USERNAME}>`,
                    to: user.email,
                    subject: "Your Activation Link for YOUR APP",
                    text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}`,
                    html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/api/auth/verification/verify-account/${user._id}/${secretCode}" target="_blank">Email bestätigen</a></strong></p>`,
                };
                await emailService.sendMail(data);

                res.json({ success: true });
            }
        } catch (err) {
            console.log("Error on /api/auth/get-activation-email: ", err);
            res.json({ success: false });
        }
    }
);

// #route:  GET /verification/verify-account
// #desc:   Verify user's email address
// #access: Public
router.get(
    "/verification/verify-account/:userId/:secretCode",
    async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const response = await Code.findOne({
                email: user.email,
                code: req.params.secretCode,
            });

            if (!user) {
                res.sendStatus(401);
            } else {
                await User.updateOne(
                    { email: user.email },
                    { status: "active" }
                );
                await Code.deleteMany({ email: user.email });

                let redirectPath;

                if (process.env.NODE_ENV == "production") {
                    redirectPath = `${req.protocol}://${req.get(
                        "host"
                    )}account/verified`;
                } else {
                    redirectPath = `http://127.0.0.1:8080/account/verified`;
                }

                res.redirect(redirectPath);
            }
        } catch (err) {
            console.log(
                "Error on /api/auth/verification/verify-account: ",
                err
            );
            res.sendStatus(500);
        }
    }
);

// #route:  GET /verification/update-user-status
// #desc:   Verify user's email address
// #access: Public
router.get(
    "/verification/update-user-status",
    authenticateTokenWhilePending,
    async (req, res) => {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                res.json({ success: false });
            } else {
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userRole: user.role,
                        userStatus: user.status,
                    },
                    res.locals.secrets.JWT_SECRET,
                    {
                        expiresIn: 60 * 60 * 24 * 14,
                    }
                );

                req.session.token = token;

                res.json({
                    success: true,
                    userRole: user.role,
                    userId: user._id,
                    userStatus: user.status,
                });
            }
        } catch (err) {
            console.log(
                "Error on /api/auth/verification/update-user-status: ",
                err
            );
            res.json({ success: false });
        }
    }
);

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

// #route:  GET /logout
// #desc:   Logout a user
// #access: Public
router.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

// #route:  POST /delete-account
// #desc:   Logout a user
// #access: Public
router.post("/delete-account", authenticateToken, async (req, res) => {
    const { password } = req.body;

    if (!password) {
        res.json({ success: false, error: "Please provide your password." });
    } else {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                res.json({
                    success: false,
                    error: "Oh, something went wrong. Please try again!",
                });
            } else {
                const pwCheckSuccess = await compare(password, user.password);

                if (!pwCheckSuccess) {
                    res.json({
                        success: false,
                        error: "The provided password is not correct.",
                    });
                } else {
                    const deleted = await User.deleteOne({
                        email: user.email,
                    });

                    if (!deleted) {
                        res.json({
                            success: false,
                            error:
                                "Oh, something went wrong. Please try again!",
                        });
                    } else {
                        req.session = null;
                        res.json({ success: true });
                    }
                }
            }
        } catch (err) {
            console.log("Error on /api/auth/delete-account: ", err);
            res.json({
                success: false,
                error: "Oh, something went wrong. Please try again!",
            });
        }
    }
});

module.exports = router;
