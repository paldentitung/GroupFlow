import express from "express";
import {
  changeAvatarConroller,
  changePasswordController,
  removeAvatarConroller,
  updateUserProfileController,
} from "./users.controller.js";
import auth from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middleware/upload.middleware.js";
const Router = express.Router();

Router.patch(
  "/update-profile",
  auth,
  asyncHandler(updateUserProfileController),
);

Router.patch(
  "/change-avatar",
  auth,
  upload.single("avatar"),
  asyncHandler(changeAvatarConroller),
);

Router.delete("/remove-avatar", auth, asyncHandler(removeAvatarConroller));

Router.patch("/change-password", auth, asyncHandler(changePasswordController));
export default Router;
