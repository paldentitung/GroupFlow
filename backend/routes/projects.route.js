import express from "express";
import {
  createProjectController,
  getProjectsController,
} from "../controllers/projects.controller.js";
const Router = express.Router();

Router.get("/", getProjectsController);
Router.post("/", createProjectController);

export default Router;
