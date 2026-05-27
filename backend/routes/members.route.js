import express from "express";
import {
  getAllMembersController,
  getMemberDetailsController,
  removeMemberController,
  inviteMemberController,
} from "../controllers/members.controller.js";
const Router = express.Router();

Router.get("/:projectId/members", getAllMembersController);
Router.get("/:projectId/member/:memberId", getMemberDetailsController);
Router.delete("/:projectId/member/:memberId", removeMemberController);
Router.post("/:projectId/member/invite", inviteMemberController);
export default Router;
