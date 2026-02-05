const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");

//Challenge1
app.use(logger);

//Challenge2
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Challenge 3
app.set("view engine", "ejs");
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
