require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: [
      "http://localhost:8000",
      "http://localhost:3000",
      "http://192.168.100.102",
      "http://192.168.100.11",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["auth-token"],
  },
});
io.on("connection", (socket) => {
  console.log(`${socket.id} has joined`);
  socket.on("send-message", (body, room, cb) => {
    console.log(`incoming from ${socket.id}---${body.idSender}||${room}`);
    cb({ status: true });

    if (room) {
      socket.to(room).emit("message-received", body);
    } else {
      socket.broadcast.emit("message-received", body);
    }
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb({ status: true });
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});
const Router = require("./src/routers/router");

app.use(cors());
// app.listen(process.env.PORT, () => {
//   console.log("Server Running at Port", process.env.PORT);
// });
const jsonParser = express.json();
// content-type = application/x-www-form-urlencoded
// body x-www-form-urlencoded
const urlEncodedParser = express.urlencoded({ extended: false });
app.use(logger("dev"));
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"));
app.use(Router);
