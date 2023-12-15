import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import consultingRouter from "./routers/consultingRouter";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

let corsOptions = {
  origin: [
    "https://iwon-philippines.netlify.app",
    "https://iwon-cebu-month.netlify.app",
    "https://iwon-baguio.netlify.app",
    "https://iwon-tarlac.netlify.app",
    "https://iwon-cebu.netlify.app",
    "https://iwon-philippines.netlify.app",
    "https://university-bigdata.netlify.app",
    "http://localhost:5173",
    "http://127.0.0.1:5502",
    "http://127.0.0.1:5503",
    "https://sikkkkkw.github.io",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.ACCESS_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/consulting", consultingRouter);

export default app;
