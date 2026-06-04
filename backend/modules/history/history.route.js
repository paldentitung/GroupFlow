import express from "express";
import {
  getProjectHistoryController,
  getTaskHistoryController,
  getUserHistoryController,
} from "./history.controller.js";
import protect from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";

const Router = express.Router({ mergeParams: true });

Router.get(
  "/projects/:projectId",
  protect,
  asyncHandler(getProjectHistoryController),
);

Router.get(
  "/projects/:projectId/tasks/:taskId",
  protect,
  asyncHandler(getTaskHistoryController),
);
Router.get("/user-history", protect, getUserHistoryController);
export default Router;
