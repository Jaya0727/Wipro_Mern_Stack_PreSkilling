// models/associations.js
const Student = require("./Student");
const Instructor = require("./Instructor");
const Course = require("./Course");
const Enrollment = require("./Enrollment");

// Instructor → Courses
Instructor.hasMany(Course);
Course.belongsTo(Instructor);

// Student ↔ Course (Many-to-Many)
Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

module.exports = {
  Student,
  Instructor,
  Course,
  Enrollment
};
