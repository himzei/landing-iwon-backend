"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _consultingController = require("../controllers/consultingController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var consultingRouter = _express["default"].Router();
consultingRouter.get("", _consultingController.getList);
consultingRouter.post("/write", _consultingController.postWrite);
var _default = consultingRouter;
exports["default"] = _default;