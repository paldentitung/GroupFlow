import express from "express";
import {
  getAllMembersController,
  getMemberDetailsController,
} from "../controllers/members.controller.js";
const Router = express.Router();

Router.get("/:projectId/members", getAllMembersController);
Router.get("/:projectId/member/:memberId", getMemberDetailsController);
export default Router;
