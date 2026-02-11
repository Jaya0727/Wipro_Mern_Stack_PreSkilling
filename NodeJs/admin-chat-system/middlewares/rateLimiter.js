const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    return req.userId;
  },
  message: {
    error:"Too many messages.Please try again later."
  }
});

module.exports = limiter;
