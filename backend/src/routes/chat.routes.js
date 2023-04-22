import express from "express";

import { isAuthenticatedUser } from "../middlewares/auth.js";

import {
  createGroupChat,
  createPrivateChat,
  getChats,
  getChat,
} from "../controllers/chat.controllers.js";

const router = express.Router();

router.route("/").get(isAuthenticatedUser, getChats);

router.route("/:id").get(isAuthenticatedUser, getChat);

router.route("/private").post(isAuthenticatedUser, createPrivateChat);

router.route("/group").post(isAuthenticatedUser, createGroupChat);

export default router;
