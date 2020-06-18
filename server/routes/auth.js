const express = require("express");
const router = express.Router();

// #route:  POST /Login
// #desc:   Login a user
// #access: Public
router.post("/login", (req, res) => {
    console.log("req.body: ", req.body);

    res.json({ url: "/login" });
});

// #route:  POST /register
// #desc:   Register a new user
// #access: Public
router.post("/register", (req, res) => {
    console.log("req.body: ", req.body);

    const { firstName, lastName, email, password, password2 } = req.body;

    let errors = [];

    // Check Data
    if (!firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields!" });
    }
    if (password != password2) {
        errors.push({ msg: "The passwords you entered do not match!" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Your password should be at least 6 characters." });
    }

    if (errors.length > 0) {
        res.json({ success: false, errors });
    } else {
        res.json({ success: true });
    }
});

module.exports = router;
