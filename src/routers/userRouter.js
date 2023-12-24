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
import { checkInstaUrl } from "../controllers/missionController";

const userRouter = express.Router();

/**
 * @swagger
 *  /api/v1/users:
 *    get:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
userRouter.post("/signup", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/accessToken", accessToken);
userRouter.get("/refreshToken", refreshToken);
userRouter.post("/login/success", loginSuccess);
userRouter.post("/logout", logout);
userRouter.get("/social/kakao/register", kakaoAsyncRegister);
userRouter.get("/instaUrl", checkInstaUrl);

export default userRouter;
