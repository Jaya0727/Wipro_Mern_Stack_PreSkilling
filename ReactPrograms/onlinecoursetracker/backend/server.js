const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Course = require("./models/Course");
const errorHandler = require("./backend/middleware/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());

//database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/courseTracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Get all courses
app.get("/api/courses", async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

//Tp add course
app.post("/api/courses", async (req, res, next) => {
  try {
    if (!req.body.title) {
      throw new Error("Course title is required");
    }
    const newCourse = new Course({
      title: req.body.title
    });
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (err) {
    next(err);
  }
});

//To delete course
app.delete("/api/courses/:id", async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("Course not found");
    }
    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    next(err);
  }
});

//Error Handling
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
