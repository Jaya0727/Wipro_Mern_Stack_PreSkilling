const express = require("express");
const { courseValidation, checkErrors } = require("./middleware/validator");
const app = express();
app.use(express.json());
let courses = [];
//post method with validation
app.post("/api/courses", courseValidation, checkErrors, (req, res) => {
  const course = { id: Date.now(), ...req.body };
  courses.push(course);
  res.status(201).json(course);
});

app.listen(3000, () => console.log("Validation API running"));
