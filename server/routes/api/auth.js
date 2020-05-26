const express = require("express");
const router = express.Router();

const cryptoRandomString = require("crypto-random-string");
const { hash, compare } = require("../../utils/bcrypt");

// #TEST GET ROUTE
router.get("/todos", async (req, res) => {
    res.json([
        {
            id: 1213,
            title: "JTask One",
        },
        {
            id: 45345,
            title: "Task Two",
        },
    ]);
});

// #route:  POST /login
// #desc:   Login a user
// #access: Public
router.post("/login", async (req, res) => {
    res.json({ test: "test" });
});

// #route:  POST /register
// #desc:   Register a new user
// #access: Public

// Update User

// Delete User

module.exports = router;
