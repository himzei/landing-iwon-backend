import express from "express";
import {
  getList,
  postUniversity,
  postWrite,
  postWriteIcan,
  postWriteYJ,
} from "../controllers/consultingController";

const consultingRouter = express.Router();

consultingRouter.get("", getList);
consultingRouter.post("/write", postWrite);
consultingRouter.post("/write-yj", postWriteYJ);
consultingRouter.post("/writeIcan", postWriteIcan);
consultingRouter.post("/writeUniversity", postUniversity);

export default consultingRouter;
