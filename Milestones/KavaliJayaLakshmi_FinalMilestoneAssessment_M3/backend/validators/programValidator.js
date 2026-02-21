const { body } = require("express-validator");

exports.createProgramValidation = [
  body("programId")
    .notEmpty()
    .withMessage("Program ID is required"),
  body("name")
    .notEmpty()
    .withMessage("Program name is required"),
  body("category")
    .notEmpty()
    .withMessage("Category is required"),
  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Level must be Beginner, Intermediate, or Advanced"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number")
];