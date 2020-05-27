const jwt = require("jsonwebtoken");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../secrets");
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, secrets.JWT_SECRET, (err, user) => {
        if (err) {
            return;
        }

        req.userId = user.userId;
        req.role = user.role;
    });

    next();
};

module.exports = authenticateToken;
