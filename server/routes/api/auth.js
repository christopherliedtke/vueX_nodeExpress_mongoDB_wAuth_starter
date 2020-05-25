const express = require('express');
const router = express.Router();

const cryptoRandomString = require('crypto-random-string');
const { hash, compare } = require('../../utils/bcrypt');

// #route:  POST /login
// #desc:   Login a user
// #access: Public
router.get('/login', async (req, res) => {
    res.json({ test: 'test' });
});

// #route:  POST /register
// #desc:   Register a new user
// #access: Public

// Update User

// Delete User

module.exports = router;
