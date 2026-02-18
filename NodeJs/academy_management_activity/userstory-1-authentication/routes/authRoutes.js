const express = require("express");
const router = express.Router();
const users = require("../models/User");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.send("Invalid Credentials");

  req.session.user = user;
  res.redirect("/dashboard");
});

module.exports = router;

