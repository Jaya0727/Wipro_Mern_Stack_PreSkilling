import express from "express";
import http from "http";
import { Server } from "socket.io";
import uploadRoutes from "./routes/uploadroutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
//Serve uploaded files(Challenge 2)
app.use("/materials", express.static("uploads"));
//Routes (Challenge 1)
app.use("/upload", uploadRoutes);
//Socket.io (Challenge 3)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
