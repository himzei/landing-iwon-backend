"use strict";

var _http = _interopRequireDefault(require("http"));
var _ws = require("ws");
require("dotenv/config");
require("./db.js");
require("./models/Consulting.js");
require("./models/Community.js");
require("./models/User.js");
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var handleListening = function handleListening() {
  return console.log("Server listening on http://localhost:".concat(process.env.PORT));
};
var server = _http["default"].createServer(_server["default"]);
var wss = new _ws.WebSocketServer({
  server: server
});
wss.on("connection", function (socket) {
  console.log("채팅접속");
  socket.on("close", function () {
    return console.log("접속종료");
  });
  socket.on("message", function (message) {
    console.log(message.toString("utf8"));
  });
  socket.send("hello");
});
server.listen(process.env.PORT, handleListening);