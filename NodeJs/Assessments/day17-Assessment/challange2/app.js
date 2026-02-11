const chalk = require("chalk");
const figlet = require("figlet");
figlet("Welcome to Node.js", (err, data) => {
    if (err) {
        console.log("Error loading figlet");
        return;
    }
    console.log(chalk.pink(data));
});
