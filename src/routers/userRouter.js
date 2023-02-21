import express from "express";
import { getJoin, postJoin, postLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/signup").get(getJoin).post(postJoin);
userRouter.post("/login", postLogin);

export default userRouter;
