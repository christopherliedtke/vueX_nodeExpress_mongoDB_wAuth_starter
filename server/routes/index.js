const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ url: "/" });
});

router.get("/api/user-data", (req, res) => {
    console.log("req.user in /api/user-data: ", req.user);

    res.json({ userData: "test user data" });
});

module.exports = router;
