// middlewares/roleMiddleware.js
module.exports = (role) => {
  return (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};
