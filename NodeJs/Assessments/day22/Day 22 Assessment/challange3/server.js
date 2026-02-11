const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

console.log("THIS SERVER FILE IS RUNNING");

// ROOT TEST
app.get("/", (req, res) => {
  res.send("SERVER WORKING");
});

// RATE LIMIT
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many requests" }
});
app.use(limiter);

// DATA
let courses = [];

// VALIDATION
const validateCourse = [
  body("name").notEmpty().withMessage("Course name is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
];

// ERROR CHECK
function checkErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
}

// ROUTES
app.get("/api/v1/courses", (req, res) => {
  res.json(courses);
});

app.post("/api/v1/courses", validateCourse, checkErrors, (req, res) => {
  const course = { id: Date.now(), ...req.body };
  courses.push(course);
  res.status(201).json(course);
});

// START
app.listen(3000, () => console.log("Server started on port 3000"));
