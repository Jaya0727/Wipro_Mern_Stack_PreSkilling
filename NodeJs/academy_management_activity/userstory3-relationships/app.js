const sequelize = require("./config/database");
require("./models/associations");

sequelize.sync({ force: true }).then(() => {
  console.log("All relationships created successfully");
});
