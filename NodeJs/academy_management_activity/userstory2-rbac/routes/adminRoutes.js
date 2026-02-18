const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middlewares/roleMiddleware");
const data = require("../data/mockData");

// Admin: create instructor
router.post("/admin/instructor", roleMiddleware("admin"), (req, res) => {
  data.instructors.push(req.body.name);
  res.send("Instructor Created");
});

// Admin: create course
router.post("/admin/course", roleMiddleware("admin"), (req, res) => {
  data.courses.push(req.body);
  res.send("Course Created");
});

// Admin: view all reports
router.get("/admin/reports", roleMiddleware("admin"), (req, res) => {
  res.json(data);
});

module.exports = router;
