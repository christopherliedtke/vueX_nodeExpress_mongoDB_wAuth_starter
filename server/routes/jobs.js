const express = require("express");
const router = express.Router();

// #route:  GET /api/jobs
// #desc:   Get all jobs
// #access: Public
router.get("/", async (req, res) => {
    res.json({
        jobs: [
            { id: 1, title: "Job 1" },
            { id: 2, title: "Job 2" },
        ],
    });
});

module.exports = router;
