import express from "express";
import {
  getTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  respondToTaskController,
  getCurrentUserTasksController,
} from "./tasks.controller.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import auth from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import {
  createTaskValidator,
  updateTaskValidator,
  respondToTaskValidator,
} from "./tasks.validator.js";
import { createTaskLimiter } from "../../utils/rateLimiter.js";

const Router = express.Router();

Router.get("/:projectId/tasks", asyncHanlder(getTasksController));
Router.get("/task/:taskId", asyncHanlder(getTaskByIdController));
Router.get("/my-tasks", auth, asyncHanlder(getCurrentUserTasksController));
Router.post(
  "/:projectId/tasks",
  auth,
  createTaskLimiter,
  validate(createTaskValidator),
  asyncHanlder(createTaskController),
);
Router.put(
  "/:taskId",
  auth,
  validate(updateTaskValidator),
  asyncHanlder(updateTaskController),
);
Router.delete("/:taskId", auth, asyncHanlder(deleteTaskController));
Router.patch(
  "/:taskId/respond",
  auth,
  validate(respondToTaskValidator),
  asyncHanlder(respondToTaskController),
);
export default Router;
