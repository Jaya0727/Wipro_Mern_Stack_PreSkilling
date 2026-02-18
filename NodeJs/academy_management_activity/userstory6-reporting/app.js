// app.js
const { Sequelize } = require("sequelize");
const sequelize = require("./config/database");

const {
  Student,
  Instructor,
  Course,
  Enrollment
} = require("./models/associations");

async function runReports() {
  await sequelize.sync({ force: true });

  // ---- Seed minimal data ----
  const instructor = await Instructor.create({ name: "John" });

  const course1 = await Course.create({
    title: "NodeJS",
    price: 1000,
    InstructorId: instructor.id
  });

  const course2 = await Course.create({
    title: "React",
    price: 1200,
    InstructorId: instructor.id
  });

  const student1 = await Student.create({ name: "A" });
  const student2 = await Student.create({ name: "B" });

  await Enrollment.bulkCreate([
    { StudentId: student1.id, CourseId: course1.id },
    { StudentId: student2.id, CourseId: course1.id },
    { StudentId: student1.id, CourseId: course2.id }
  ]);

  // ---------------- REPORTS ----------------

  //  Total students per course
  const studentsPerCourse = await Course.findAll({
    attributes: [
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("Students.id")), "totalStudents"]
    ],
    include: {
      model: Student,
      attributes: []
    },
    group: ["Course.id"]
  });

  console.log("\nTotal Students Per Course");
  console.log(studentsPerCourse.map(r => r.toJSON()));

  // Total revenue per instructor
  const revenuePerInstructor = await Instructor.findAll({
    attributes: [
      "name",
      [Sequelize.fn("SUM", Sequelize.col("Courses.price")), "totalRevenue"]
    ],
    include: {
      model: Course,
      attributes: []
    },
    group: ["Instructor.id"]
  });

  console.log("\nTotal Revenue Per Instructor");
  console.log(revenuePerInstructor.map(r => r.toJSON()));

  // Most popular course
  const mostPopularCourse = await Enrollment.findAll({
    attributes: [
      "CourseId",
      [Sequelize.fn("COUNT", Sequelize.col("CourseId")), "enrollCount"]
    ],
    group: ["CourseId"],
    order: [[Sequelize.literal("enrollCount"), "DESC"]],
    limit: 1
  });

  console.log("\nMost Popular Course");
  console.log(mostPopularCourse.map(r => r.toJSON()));
}

runReports();
