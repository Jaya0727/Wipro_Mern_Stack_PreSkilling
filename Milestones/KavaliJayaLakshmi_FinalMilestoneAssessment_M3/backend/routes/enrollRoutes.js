const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const Program = require("../models/Program");
const User = require("../models/User");

router.post("/", async (req, res, next) => {
  try {
    const { userId, programId } = req.body;
    if (!userId || !programId) {
      return res.status(400).json({
        success: false,
        message: "userId and programId required",
        data: null
      });
    }

    const program = await Program.findOne({ programId });
    if (!program) {
      return res.status(400).json({
        success: false,
        message: "Program not found",
        data: null
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        data: null
      });
    }

    const existing = await Enrollment.findOne({ userId, programId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
        data: null
      });
    }

    const enrollment = await Enrollment.create({
      userId,
      programId
    });

    res.status(201).json({
      success: true,
      message: "Enrollment successful",
      data: {
        enrollmentId: enrollment._id,
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email
        },
        program: {
          programId: program.programId,
          name: program.name,
          category: program.category,
          level: program.level,
          price: program.price
        },
        enrolledOn: enrollment.enrolledOn
      }
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;