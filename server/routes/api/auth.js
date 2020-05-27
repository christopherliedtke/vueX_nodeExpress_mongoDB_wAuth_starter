const express = require("express");
const router = express.Router();
const { User } = require("../../utils/models/user");

const cryptoRandomString = require("crypto-random-string");
const { hash, compare } = require("../../utils/bcrypt");

// #route:  POST /login
// #desc:   Login a user
// #access: Public
router.post("/login", async (req, res) => {
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
                    req.session.userId = user[0]["_id"];

                    res.json({
                        success: true,
                        userId: req.session.userId,
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
router.post("/register", async (req, res) => {
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

        req.session.userId = user["_id"];

        res.json({
            success: true,
            userId: req.session.userId,
        });
    } catch (err) {
        console.log("Error on newUser.save(): ", err);
        res.json({ success: false });
    }

    // console.log("req.body: ", req.body);
    // console.log("hashedPw: ", hashedPw);

    // res.json({ test: "test" });
});

// Update User

// Delete User

module.exports = router;
