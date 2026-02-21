const express = require("express");
const cors = require("cors");
const programRoutes = require("./routes/programRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/programs", programRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

module.exports = app;