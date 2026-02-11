const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User");
const app = express();
//MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/day22DB")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
//EJS 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,email,password: hashedPassword
    });
    await user.save();
    console.log("User Saved:", user);
    res.render("success", { username: name });
});
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
