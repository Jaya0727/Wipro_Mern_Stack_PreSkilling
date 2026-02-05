const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId");

router.get("/", (req, res) => {
  res.json({
    message: "Courses API is working"
  });
});
router.get("/:id", validateCourseId, (req, res) => {
  res.json({
    id: req.params.id,
    name: "React Mastery",
    duration: "6 weeks"
  });
});

module.exports = router;
