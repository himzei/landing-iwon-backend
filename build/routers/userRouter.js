"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.post("/signup", _userController.postJoin);
userRouter.post("/login", _userController.postLogin);
userRouter.get("/accessToken", _userController.accessToken);
userRouter.get("/refreshToken", _userController.refreshToken);
userRouter.get("/login/success", _userController.loginSuccess);
userRouter.post("/logout", _userController.logout);
var _default = userRouter;
exports["default"] = _default;