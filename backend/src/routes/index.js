import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import chatRouter from "./chat.routes.js";
import messageRouter from "./message.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/chats", chatRouter);
router.use("/messages", messageRouter);

export default router;
