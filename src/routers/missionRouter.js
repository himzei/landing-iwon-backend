import express from "express";
import { postInstaRegister } from "../controllers/missionController";

const missionRouter = express.Router();

missionRouter.post("/register", postInstaRegister);

export default missionRouter;
