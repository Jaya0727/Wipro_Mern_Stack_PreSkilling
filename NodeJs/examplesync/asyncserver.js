const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  // Asynchronously reads the file
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error reading file");
      return;
    }

    res.end(data); // send file content
  });

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});