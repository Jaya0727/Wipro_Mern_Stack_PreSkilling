console.log("Node Version:", process.version);

console.log("File Name:", __filename);
console.log("Directory Name:", __dirname);

let count = 0;
const interval = setInterval(() => {
    console.log(" Welcome to Node.js Backend Development!");
    count++;
}, 3000);

//Bonus
setTimeout(() => {
    clearInterval(interval);
    console.log(" Timer stopped after 10 seconds.");
}, 10000);
