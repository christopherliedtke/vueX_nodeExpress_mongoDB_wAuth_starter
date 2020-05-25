const express = require('express');
const router = express.Router();

// Get Jobs

router.get('/jobs', (req, res) => {
    res.json({ test: 'test' });
});

// Add Job

// Update Job

// Delete Job

module.exports = router;
