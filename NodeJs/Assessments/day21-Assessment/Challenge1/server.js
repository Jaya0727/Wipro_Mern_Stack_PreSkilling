const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const { name } = req.body;

    res.send(`Registration successful for ${name}`);
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
