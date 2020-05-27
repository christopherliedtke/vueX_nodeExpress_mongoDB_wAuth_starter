const requireLogin = (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
        return res.sendStatus(401);
    }

    next();
};

module.exports = requireLogin;
