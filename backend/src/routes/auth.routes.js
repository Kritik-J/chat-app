import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);
router.route("/profile").get(isAuthenticatedUser, getProfile);

export default router;
