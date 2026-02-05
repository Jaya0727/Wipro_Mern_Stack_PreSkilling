module.exports = function studentValidator(req, res, next) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "name and email are required"
        });
    }

    next();
};
