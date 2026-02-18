// data/seed.js
const sequelize = require("../config/database");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

async function seed() {
  await sequelize.sync({ force: true });

  for (let i = 1; i <= 15; i++) {
    await Student.create({ name: `Student ${i}` });
    await Course.create({ title: `Course ${i}` });
  }

  console.log("Sample data inserted");
}

seed();
