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
import auth from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/", auth, asyncHandler(getProjectsController));
Router.post(
  "/",
  auth,
  validate(createProjectSchema),
  asyncHandler(createProjectController),
);
Router.put("/:projectId", auth, asyncHandler(updateProjectController));
Router.delete("/:projectId", auth, asyncHandler(deleteProjectController));
export default Router;
