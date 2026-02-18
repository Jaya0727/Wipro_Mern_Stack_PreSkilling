const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

app.set("view engine", "ejs");

app.use(authRoutes);

app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Welcome ${req.session.user.username}`);
});

app.listen(3000, () => {
  console.log("User Story 1 running on port 3000");
});

