import express from "express";

import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getMessagesByChatId,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.route("/").post(isAuthenticatedUser, sendMessage);

router.route("/chats/:chatId").get(isAuthenticatedUser, getMessagesByChatId);

export default router;
