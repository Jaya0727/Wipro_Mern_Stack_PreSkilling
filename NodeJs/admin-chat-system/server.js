const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const auth = require("./middlewares/auth");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use("/uploads",express.static("uploads"));
// send message
io.on("connection",(socket) => {
  console.log("User connected");

  socket.on("adminMessage", (msg) => {
//To broadcast/receive message - emit
    io.emit("receiveMessage", msg);
  });
});

const upload = multer({
  dest: "uploads/"
});

app.post("/upload",
  auth,
  rateLimiter,
  upload.single("file"),
  (req, res) => {
    res.json({
      message: "File uploaded successfully",
      file: req.file.filename
    });
  }
);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
