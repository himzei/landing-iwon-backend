import express from "express";
import { getList, postWrite } from "../controllers/consultingController";

const consultingRouter = express.Router();

consultingRouter.get("", getList);
consultingRouter.post("/write", postWrite);

export default consultingRouter;
