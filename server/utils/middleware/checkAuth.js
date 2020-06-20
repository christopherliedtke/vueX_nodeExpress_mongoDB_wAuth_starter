const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.session.token;

    jwt.verify(token, res.locals.secrets.JWT_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(401);
        } else {
            next();
        }
    });
};

module.exports = authenticateToken;
