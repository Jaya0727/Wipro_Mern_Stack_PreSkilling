const Student = require("./Student");
const Profile = require("./Profile");
const Course = require("./Course");
const Enrollment = require("./Enrollment");

// Student + Profile
Student.hasOne(Profile);
Profile.belongsTo(Student);

// Student + Course (Many-to-Many)
Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

module.exports = { Student, Profile, Course, Enrollment };
