"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var communitySchema = new _mongoose["default"].Schema({
  title: String,
  company: String,
  contents: String,
  createdAt: Date
});
var Community = _mongoose["default"].model("Community", communitySchema);
var _default = Community;
exports["default"] = _default;