import express from "express";
import {
  getTasksController,
  createTaskController,
} from "../controllers/tasks.controller.js";
import asyncHanlder from "../utils/asyncHandler.js";
import auth from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/:projectId/tasks", getTasksController);
Router.post("/:projectId/tasks", auth, asyncHanlder(createTaskController));
export default Router;
