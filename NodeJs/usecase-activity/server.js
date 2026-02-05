const express = require("express");
const app = express();
const PORT = 6000;

const requestLogger = require("./middleware/requestlogger");
const studentValidator = require("./middleware/studentvalidator");
const errorHandler = require("./middleware/errorhandler");
const bodyParser = require("./routes/bodyparser");

// User Story 3
app.use(bodyParser);

// User Story 1
app.use(requestLogger);

app.get("/", (req, res) => {
    res.send("Home Page");
});

// User Story 2
app.post("/students", studentValidator, (req, res) => {
    res.json({
        success: true,
        data: req.body
    });
});

// User Story 4
app.get("/error", (req, res, next) => {
    next(new Error("Interal error"));
});
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
