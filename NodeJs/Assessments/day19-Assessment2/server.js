const express = require("express");
const app = express();
const courseRoutes = require("./routes/courses");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});
app.use("/courses", courseRoutes);
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
