import express from "express";
import {
  getAllMembersController,
  getMemberDetailsController,
  removeMemberController,
  inviteMemberController,
  acceptInviteController,
} from "../controllers/members.controller.js";
import auth from "../middleware/auth.middleware.js";
const Router = express.Router();

Router.get("/:projectId/members", getAllMembersController);
Router.get("/:projectId/member/:memberId", getMemberDetailsController);
Router.delete("/:projectId/member/:memberId", removeMemberController);
Router.post("/:projectId/member/invite", auth, inviteMemberController);
Router.post("/:projectId/member/accept/:token", auth, acceptInviteController);
export default Router;
