const Student = require("./Student");
const Profile = require("./Profile");
const Instructor = require("./Instructor");
const Course = require("./Course");
const Enrollment = require("./Enrollment");

// One-to-One
Student.hasOne(Profile);
Profile.belongsTo(Student);

// One-to-Many
Instructor.hasMany(Course);
Course.belongsTo(Instructor);

// Many-to-Many
Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

module.exports = {
  Student,
  Profile,
  Instructor,
  Course,
  Enrollment
};
