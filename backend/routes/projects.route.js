import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/projects.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
const Router = express.Router();

Router.get("/", asyncHandler(getProjectsController));
Router.post("/", asyncHandler(createProjectController));
Router.put("/:projectId", asyncHandler(updateProjectController));
Router.delete("/:projectId", asyncHandler(deleteProjectController));
export default Router;
