import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import consultingRouter from "./routers/consultingRouter.js";

const app = express();

let corsOptions = {
  origin: ["https://iwon-philippines.netlify.app", "http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/consulting", consultingRouter);

export default app;
