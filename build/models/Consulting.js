"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var consultingSchema = new _mongoose["default"].Schema({
  type: String,
  name: String,
  tel: String,
  email: String,
  category: [{
    type: String
  }],
  message: String,
  createdAt: Date
});
var Consulting = _mongoose["default"].model("Consulting", consultingSchema);
var _default = Consulting;
exports["default"] = _default;