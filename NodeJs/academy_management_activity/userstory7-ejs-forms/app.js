// app.js
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// ROUTES TO SHOW FORMS
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/create-instructor", (req, res) => {
  res.render("createInstructor");
});

app.get("/create-student", (req, res) => {
  res.render("createStudent");
});

app.get("/enroll-student", (req, res) => {
  res.render("enrollStudent");
});

// DUMMY POST HANDLERS (JUST TO RECEIVE FORM DATA)
app.post("/login", (req, res) => {
  res.send(req.body);
});

app.post("/create-instructor", (req, res) => {
  res.send(req.body);
});

app.post("/create-student", (req, res) => {
  res.send(req.body);
});

app.post("/enroll-student", (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("userstory7-ejs-forms running on port 3000");
});
