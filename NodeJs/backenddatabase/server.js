const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student");

const app = express();
mongoose.connect("mongodb://localhost:27017/admin")
.then(() => console.log("DB connected"))
.catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.post("/students", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "name and email are required"
      });
    }

    await Student.create({ name, email });
    res.send("Student data is saved successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
