import express from "express";
import {
  getTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  respondToTaskController,
  getCurrentUserTasksController,
} from "../controllers/tasks.controller.js";
import asyncHanlder from "../utils/asyncHandler.js";
import auth from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/:projectId/tasks", asyncHanlder(getTasksController));
Router.get("/task/:taskId", asyncHanlder(getTaskByIdController));
Router.get("/my-tasks", auth, asyncHanlder(getCurrentUserTasksController));
Router.post("/:projectId/tasks", auth, asyncHanlder(createTaskController));
Router.put("/:taskId", auth, asyncHanlder(updateTaskController));
Router.delete("/:taskId", auth, asyncHanlder(deleteTaskController));
Router.patch("/:taskId/respond", auth, asyncHanlder(respondToTaskController));
export default Router;
