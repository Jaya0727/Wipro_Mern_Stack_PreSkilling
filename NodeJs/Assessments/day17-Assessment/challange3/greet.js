const moment = require("moment");

const name = process.argv[2];
if (!name) {
    console.log("Please provide your name.");
    process.exit();
}
const dateTime = moment().format("ddd MMM D YYYY, hh:mm A");

console.log(`Hello, ${name}! Today is ${dateTime}`);
