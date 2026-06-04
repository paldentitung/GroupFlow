import express from "express";
import protect from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getUserNotificatonController,
  markAllAsReadController,
  markAsReadController,
} from "../controllers/notification.controller.js";
const Router = express.Router();

Router.get("/", protect, asyncHandler(getUserNotificatonController));
Router.patch("/", protect, asyncHandler(markAsReadController));
Router.patch("/read-all", protect, asyncHandler(markAllAsReadController));

export default Router;
