import express from "express";
import { accessToken, loginSuccess, logout, postJoin, postLogin, refreshToken } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/accessToken", accessToken);
userRouter.get("/refreshToken", refreshToken);
userRouter.get("/login/success", loginSuccess);
userRouter.post("/logout", logout);

export default userRouter;