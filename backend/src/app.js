import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";
import errorMiddleWare from "./middlewares/error.js";
import cors from "cors";
import { Chat, Message, User } from "./models/index.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/", mainRouter);

app.use(errorMiddleWare);

export default app;
