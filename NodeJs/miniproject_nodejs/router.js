const fs = require("fs").promises;
const path = require("path");
const logger = require("./logger");
const emitter = require("./events");

const usersFile = path.join(__dirname, "users.json");
async function router(req, res) {
  logger(`${req.method} ${req.url}`);
  try {
    if (req.url === "/login" && req.method === "GET") {
      emitter.emit("userLogin", {
        user: "Jaya",
        salary: 45000,
        time: new Date().toLocaleString()
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Login successful. Log created.");
    }
    else if (req.url === "/users" && req.method === "GET") {
      const data = await fs.readFile(usersFile, "utf8");
      emitter.emit("dataFetched", { count: JSON.parse(data).length });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    }
    else if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Server is healthy");
    }
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route not found");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error: " + error.message);
  }
}
module.exports = router;
