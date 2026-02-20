const http = require("http");
const fs = require("fs");
const path = require("path");
const router = require("./router");
const server = http.createServer((req,res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(path.join(__dirname,"index.html"), (err,data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } 
  else {
    router(req,res);}
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
