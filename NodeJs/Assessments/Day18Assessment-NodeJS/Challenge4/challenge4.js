const fs = require("fs").promises;
async function fileHandler() {
    const input = "Node.js is awesome!";
    const fileName = "feedback.txt";
    try {
    // Write to file
        await fs.writeFile(fileName, input);
        console.log("Data written successfully.");
    // Read from file
        console.log("Reading file");
        const data = await fs.readFile(fileName,"utf8");
        console.log(data);
    } catch (error) {
        console.log("Error:",error);
    }
}
fileHandler();
