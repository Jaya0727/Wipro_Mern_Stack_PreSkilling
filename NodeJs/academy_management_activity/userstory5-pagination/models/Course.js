// models/Course.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = sequelize.define("Course", {
  title: DataTypes.STRING
});
