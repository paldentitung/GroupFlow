import express from "express";
import {
  getTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";
import asyncHanlder from "../utils/asyncHandler.js";
import auth from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/:projectId/tasks", asyncHanlder(getTasksController));
Router.post("/:projectId/tasks", auth, asyncHanlder(createTaskController));
Router.put("/:taskId", auth, asyncHanlder(updateTaskController));
Router.delete("/:taskId", auth, asyncHanlder(deleteTaskController));
export default Router;
