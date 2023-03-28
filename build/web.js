import http from "http";
import { WebSocketServer } from "ws";
import "dotenv/config";
import "./db.js";
import "./models/Consulting.js";
import "./models/Community.js";
import "./models/User.js";
import app from "./server.js";

const handleListening = () => console.log(`Server listening on http://localhost:${process.env.PORT}`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", socket => {
  console.log("채팅접속");
  socket.on("close", () => console.log("접속종료"));
  socket.on("message", message => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello");
});

server.listen(process.env.PORT, handleListening);