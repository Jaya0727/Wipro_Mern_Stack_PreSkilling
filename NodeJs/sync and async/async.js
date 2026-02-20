const fs = require("fs");
console.log("Start");
fs.readFile("bigfile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("File read complete");
});

console.log("End");
