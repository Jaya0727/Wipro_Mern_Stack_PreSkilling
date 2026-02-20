const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  // Synchronously reads the file
  const data = fs.readFileSync("data.txt", "utf8");
  res.end(data);

});

server.listen(3001, () => {
  console.log("Server running on port 3000 http://localhost:3001");
});