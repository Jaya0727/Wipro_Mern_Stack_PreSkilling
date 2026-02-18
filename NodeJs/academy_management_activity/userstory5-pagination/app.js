// app.js
const express = require("express");
const sequelize = require("./config/database");

const Student = require("./models/Student");
const Course = require("./models/Course");
const Enrollment = require("./models/Enrollment");

const app = express();
const LIMIT = 5;

// STUDENTS PAGINATION
app.get("/students", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * LIMIT;

  const data = await Student.findAll({
    limit: LIMIT,
    offset
  });

  res.json(data);
});

// COURSES PAGINATION
app.get("/courses", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * LIMIT;

  const data = await Course.findAll({
    limit: LIMIT,
    offset
  });

  res.json(data);
});

// ENROLLMENTS PAGINATION
app.get("/enrollments", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * LIMIT;

  const data = await Enrollment.findAll({
    limit: LIMIT,
    offset
  });

  res.json(data);
});

app.listen(3000, () => {
  console.log("userstory5-pagination running on port 3000");
});
