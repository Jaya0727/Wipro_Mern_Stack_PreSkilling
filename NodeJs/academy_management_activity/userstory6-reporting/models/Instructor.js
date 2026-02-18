// models/Instructor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("Instructor", {
  name: DataTypes.STRING
});
