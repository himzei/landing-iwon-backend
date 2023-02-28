import http from "http";
import WebSocket from "ws";
import "dotenv/config";
import "./db";
import "./models/Consulting";
import "./models/Community";
import "./models/User";
import app from "./server";

const handleListening = () =>
  console.log(`Server listening on http://localhost:4000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("채팅접속");
  socket.on("close", () => console.log("접속종료"));
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello");
});

server.listen(process.env.PORT, handleListening);
