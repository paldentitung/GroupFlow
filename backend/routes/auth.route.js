import express from "express";
import {
  loginController,
  registerController,
  verifyEmailController,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import auth from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.post("/register", asyncHandler(registerController));
Router.get("/verify-email/:token", asyncHandler(verifyEmailController));
Router.post("/login", asyncHandler(loginController));
Router.post("/logout", asyncHandler(logout));
Router.get("/me", auth, asyncHandler(getMe));
export default Router;
