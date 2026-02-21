const express = require("express");
const Program = require("../models/Program");
const { createProgramValidation } = require("../validators/programValidator");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post("/",createProgramValidation,validateRequest,
  async (req, res, next) => {
    try {
      const program = await Program.create(req.body);
      res.status(201).json({
        success: true,
        message: "Program added successfully",
        data: program
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const programs = await Program.find();
    res.status(200).json({
      success: true,
      message: "Programs fetched successfully",
      data: programs
    });
  } 
  catch (err) {
    next(err);
  }
});

module.exports = router;