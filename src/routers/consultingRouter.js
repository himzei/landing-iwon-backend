import express from "express";
import {
  getList,
  postWrite,
  postWriteIcan,
} from "../controllers/consultingController";

const consultingRouter = express.Router();

consultingRouter.get("", getList);
consultingRouter.post("/write", postWrite);
consultingRouter.post("/writeIcan", postWriteIcan);

export default consultingRouter;
