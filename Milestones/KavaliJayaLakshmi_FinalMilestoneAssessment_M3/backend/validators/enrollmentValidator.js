const { body } = require("express-validator");

exports.enrollValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required"),
  body("programId")
    .notEmpty()
    .withMessage("Program ID is required")
];