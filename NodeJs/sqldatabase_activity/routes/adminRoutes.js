const express = require("express");
const controller = require("../controllers/userController");
const { validateUser, validate } = require("../middleware/userValidation");

const router = express.Router();

router.post(
  "/register",
  validateUser,
  validate,
  controller.createUser
);

module.exports = router;
