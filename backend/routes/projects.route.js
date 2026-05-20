import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/projects.controller.js";
const Router = express.Router();

Router.get("/", getProjectsController);
Router.post("/", createProjectController);
Router.put("/:projectId", updateProjectController);
Router.delete("/:projectId", deleteProjectController);
export default Router;
