// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("academydb", "root", "anurag2775", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
