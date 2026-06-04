import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "./projects.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.middleware.js";
import { createProjectSchema } from "./projects.validator.js";
import auth from "../../middleware/auth.middleware.js";
import { createProjectLimiter } from "../../utils/rateLimiter.js";
const Router = express.Router();

Router.get("/", auth, asyncHandler(getProjectsController));
Router.post(
  "/",
  auth,
  createProjectLimiter,
  validate(createProjectSchema),
  asyncHandler(createProjectController),
);
Router.put("/:projectId", auth, asyncHandler(updateProjectController));
Router.delete("/:projectId", auth, asyncHandler(deleteProjectController));
export default Router;
