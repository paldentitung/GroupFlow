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
import validate from "../middleware/validate.middleware.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  loginLimiter,
  registerLimiter,
  verifyEmailLimiter,
} from "../utils/rateLimiter.js";
const Router = express.Router();

Router.post(
  "/register",
  registerLimiter,
  validate(registerValidator),
  asyncHandler(registerController),
);
Router.get(
  "/verify-email/:token",
  verifyEmailLimiter,
  asyncHandler(verifyEmailController),
);
Router.post(
  "/login",
  validate(loginValidator),
  loginLimiter,
  asyncHandler(loginController),
);
Router.post("/logout", asyncHandler(logout));
Router.get("/me", auth, asyncHandler(getMe));
export default Router;
