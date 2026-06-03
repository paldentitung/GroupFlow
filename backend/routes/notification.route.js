import express from "express";
import protect from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getUserNotificatonController,
  markAsReadController,
} from "../controllers/notification.controller.js";
const Router = express.Router();

Router.get("/", protect, asyncHandler(getUserNotificatonController));
Router.patch("/", protect, asyncHandler(markAsReadController));

export default Router;
