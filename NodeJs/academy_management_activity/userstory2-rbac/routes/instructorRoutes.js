const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const data = require("../data/mockData");

// Instructor: view only assigned courses
router.get("/instructor/courses", roleMiddleware("instructor"), (req, res) => {
  const myCourses = data.courses.filter(
    course => course.instructor === req.session.user.username
  );
  res.json(myCourses);
});

module.exports = router;
