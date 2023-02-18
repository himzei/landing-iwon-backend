import express from "express";
import logger from "morgan";

const app = express();

app.use(logger("dev"));

const handleListening = () =>
  console.log(`Server listening on http://localhost:4000`);

app.listen(4000, handleListening);
