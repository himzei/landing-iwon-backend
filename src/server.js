import "./db";
import express from "express";
import logger from "morgan";
import userRouter from "./routers/userRouter";

const app = express();

app.use(logger("dev"));

app.use("/api/v1/users", userRouter);

const handleListening = () =>
  console.log(`Server listening on http://localhost:4000`);

app.listen(4000, handleListening);
