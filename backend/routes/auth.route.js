import express from "express";
import {
  loginController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const Router = express.Router();

Router.post("/register", asyncHandler(registerController));
Router.get("/verify-email/:token", asyncHandler(verifyEmailController));
Router.post("/login", asyncHandler(loginController));
export default Router;
