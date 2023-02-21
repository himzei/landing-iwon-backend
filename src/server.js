import express from "express";
import logger from "morgan";
import cors from "cors";
import userRouter from "./routers/userRouter";
import consultingRouter from "./routers/consultingRouter";

const app = express();

let corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/consulting", consultingRouter);

export default app;
