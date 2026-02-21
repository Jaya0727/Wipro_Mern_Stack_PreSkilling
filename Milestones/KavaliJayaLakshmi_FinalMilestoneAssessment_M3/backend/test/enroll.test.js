const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Program = require("../models/Program");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");

describe("Enrollment API", function () {
  before(async function () {
    await mongoose.connect("mongodb://127.0.0.1:27017/fittrack_test");
    await Program.deleteMany({});
    await User.deleteMany({});
    await Enrollment.deleteMany({});

    await Program.create({
      programId: "FTP001",
      name: "Test Program",
      category: "Test",
      level: "Beginner",
      price: 1000
    });

    await User.create({
      userId: "USR101",
      name: "Arjun Mehta",
      email: "arjun.mehta@example.com"
    });

  });

  it("should enroll successfully", async function () {
    const res = await request(app)
      .post("/api/enroll")
      .send({
        userId: "USR101",
        programId: "FTP001"
      });

    if (res.status !== 201) {
      console.log(res.body);
      throw new Error("Expected 201");
    }

  });

  it("should prevent duplicate enrollment", async function () {
    const res = await request(app)
      .post("/api/enroll")
      .send({
        userId: "USR101",
        programId: "FTP001"
      });

    if (res.status !== 400) {
      console.log(res.body);
      throw new Error("Expected 400");
    }

  });
  after(async function () {
    await mongoose.connection.close();
  });

});