import express from "express";
import {
  loginController,
  registerController,
  verifyEmailController,
  logout,
  forgotPasswordController,
  resetPasswordController,
} from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import auth from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import { loginValidator, registerValidator } from "./auth.validator.js";
import {
  loginLimiter,
  registerLimiter,
  resetPasswordLimiter,
  verifyEmailLimiter,
} from "../../utils/rateLimiter.js";
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

Router.post("/forgot-password", asyncHandler(forgotPasswordController));
Router.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  asyncHandler(resetPasswordController),
);

Router.post("/logout", asyncHandler(logout));
export default Router;
