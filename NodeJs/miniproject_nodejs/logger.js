const fs = require("fs");
const path = require("path");
const logDir = path.join(__dirname, "logs");
const logFile = path.join(logDir, "login.log");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
function logRequest(message) {
  const log = `${new Date().toLocaleString()} - ${message}\n`;
  fs.appendFile(logFile, log, () => {});
}
module.exports = logRequest;