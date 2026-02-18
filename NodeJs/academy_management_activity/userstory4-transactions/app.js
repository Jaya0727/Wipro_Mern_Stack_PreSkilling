const sequelize = require("./config/database");
const {
  Student,
  Profile,
  Course,
  Enrollment
} = require("./models/associations");

async function runTransactions() {
  await sequelize.sync({ force: true });

  // Create a course 
  const course = await Course.create({ title: "NodeJS" });

  //  TRANSACTION 1: Student + Profile
  const t1 = await sequelize.transaction();

  try {
    const student = await Student.create(
      { name: "Anurag" },
      { transaction: t1 }
    );

    await Profile.create(
      { bio: "CS Student", StudentId: student.id },
      { transaction: t1 }
    );

    await t1.commit();
    console.log("Student + Profile created successfully");
  } catch (err) {
    await t1.rollback();
    console.log("Student + Profile transaction rolled back");
  }

  //  TRANSACTION 2: Enroll Student into Course
  const t2 = await sequelize.transaction();

  try {
    await Enrollment.create(
      { StudentId: 1, CourseId: course.id },
      { transaction: t2 }
    );

    await t2.commit();
    console.log("Student enrolled successfully");
  } catch (err) {
    await t2.rollback();
    console.log("Enrollment transaction rolled back");
  }
}

runTransactions();
