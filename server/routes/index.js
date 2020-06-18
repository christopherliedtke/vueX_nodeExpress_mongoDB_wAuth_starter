const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ url: "/" });
});

module.exports = router;
