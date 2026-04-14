const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ REQUIRED

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// socket connection
io.on("connection", (socket) => {
  console.log("User connected");
});

// API to send alert
app.post("/api/alert", (req, res) => {
  const { message } = req.body;

  // 🔥 send to all pages (alerts.html)
  io.emit("newAlert", { message });

  res.json({ success: true });
});

// start server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});