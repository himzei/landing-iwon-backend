import express from "express";
import {
  accessToken,
  kakaoAsyncRegister,
  loginSuccess,
  logout,
  postJoin,
  postLogin,
  refreshToken,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/signup", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/accessToken", accessToken);
userRouter.get("/refreshToken", refreshToken);
userRouter.get("/login/success", loginSuccess);
userRouter.post("/logout", logout);
userRouter.get("/social/kakao/register", kakaoAsyncRegister);

export default userRouter;
