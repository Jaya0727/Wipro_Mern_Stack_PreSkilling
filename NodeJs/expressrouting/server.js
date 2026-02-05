const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.set("view engine", "ejs");

// ROUTES
app.get("/", (req, res) => {
  res.render("home", {
    user: "Niti Dwivedi",
    role: "Admin",
    kpas: ["Coding", "Testing"]
  });
});

app.get("/user", (req, res) => {
  res.send("User fetched");
});

app.get("/error", (req, res, next) => {
  next(new Error("Something went wrong"));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("internal server error");
});

app.listen(3000, () => {
  console.log("Server running");
});