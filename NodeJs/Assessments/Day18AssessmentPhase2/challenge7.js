const fs = require("fs");
fs.readFile("data.txt","utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    console.log("File content is");
    console.log(data);
// Bonus
    setTimeout(() => {
        console.log("Read operation completed");
    }, 1000);
});
console.log("Reading file asynchronously");
