const fs = require("fs");
console.log("Start");
fs.readFileSync("bigfile.txt");
console.log("File read complete");
console.log("End");
