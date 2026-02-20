const fs = require("fs").promises;
async function copyFile() {
    try {
        const data = await fs.readFile("input.txt", "utf8");
    // Bonus
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fs.writeFile("output.txt", data);
        console.log("File copied successfully!");
    } catch (error) {
        console.log("Error:", error);
    }
}
copyFile();
