const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const User = require("./models/User");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/noPassportDB")
.then(() => console.log("MongoDB Connected"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({name,email,
        password: hashedPassword,role
    });
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Invalid password");
    req.session.user = user;
    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("dashboard", { user: req.session.user });
});

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    }
    res.render("denied");
}

app.get("/admin", isAdmin, (req, res) => {
    res.render("admin");
});
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});
app.listen(3000, () => console.log("Server running on 3000"));
