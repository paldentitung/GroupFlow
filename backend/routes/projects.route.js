import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/projects.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validate.middleware.js";
import { createProjectSchema } from "../validators/projects.validator.js";
const Router = express.Router();

Router.get("/", asyncHandler(getProjectsController));
Router.post(
  "/",
  validate(createProjectSchema),
  asyncHandler(createProjectController),
);
Router.put("/:projectId", asyncHandler(updateProjectController));
Router.delete("/:projectId", asyncHandler(deleteProjectController));
export default Router;
