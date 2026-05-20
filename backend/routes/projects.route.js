import express from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
} from "../controllers/projects.controller.js";
const Router = express.Router();

Router.get("/", getProjectsController);
Router.post("/", createProjectController);
Router.delete("/:projectId", deleteProjectController);
export default Router;
