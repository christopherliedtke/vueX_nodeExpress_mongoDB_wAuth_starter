const requireAdmin = (req, res, next) => {
    const role = req.role;

    if (role !== "admin") {
        return res.sendStatus(401);
    }

    next();
};

module.exports = requireAdmin;
