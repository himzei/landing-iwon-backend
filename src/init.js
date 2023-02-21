import http from "http";
import "dotenv/config";
import "./db";
import "./models/Consulting";
import "./models/Community";
import "./models/User";
import app from "./server";

const handleListening = () =>
  console.log(`Server listening on http://localhost:4000`);

app.listen(process.env.PORT, handleListening);
