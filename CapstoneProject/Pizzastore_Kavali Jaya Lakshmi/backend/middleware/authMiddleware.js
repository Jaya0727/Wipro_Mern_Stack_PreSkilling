const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader =req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json("No token provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json("Token format wrong");
    }

    //Verifying jwt token
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();

  } catch (error) {
    console.error(
      "AUTH ERROR:",
      error.message
    );
    res
      .status(401)
      .json("Invalid token");
  }
};