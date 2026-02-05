const express = require("express");
const router = express.Router();
//Challenge 3
router.get("/", (req, res) => {
  const courses = [
    { name: "React Mastery", duration: "6 weeks" },
    { name: "Node.js Bootcamp", duration: "5 weeks" },
    { name: "Python for AI", duration: "8 weeks" }
  ];

  res.render("courses", { courses });
});

module.exports = router;
