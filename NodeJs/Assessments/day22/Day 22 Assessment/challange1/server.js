const express = require("express");
const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: "Node fundametnals", duration: "2 months" },
  { id: 2, name: "React basics", duration: "3 months" }
];

//GET all
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

//POST - add
app.post("/api/courses", (req, res) => {
  const course = { id:Date.now(),...req.body };
  courses.push(course);
  res.status(201).json(course);
});

//PUT-update
app.put("/api/putcourses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  course.name = req.body.name;
  course.duration = req.body.duration;
  res.json(course);
});

// DELETE
app.delete("/api/courses/:id", (req, res) => {
  courses = courses.filter(c => c.id != req.params.id);
  res.json({ message: "Course deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
