const express = require("express");
const session = require("express-session");

const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

const app = express();
app.use(express.json());

app.use(session({
  secret: "rbac-secret",
  resave: false,
  saveUninitialized: true
}));

// ONLY to test RBAC
app.get("/login/admin", (req, res) => {
  req.session.user = { username: "admin1", role: "admin" };
  res.send("Logged in as Admin");
});

app.get("/login/instructor", (req, res) => {
  req.session.user = { username: "instructor1", role: "instructor" };
  res.send("Logged in as Instructor");
});

app.use(adminRoutes);
app.use(instructorRoutes);

app.listen(3000, () => {
  console.log("userstory2-rbac running on port 3000");
});
