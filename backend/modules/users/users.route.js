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

Router.patch("/me", auth, asyncHandler(updateUserProfileController));

Router.patch(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  asyncHandler(changeAvatarConroller),
);

Router.delete("/me/avatar", auth, asyncHandler(removeAvatarConroller));

Router.patch("/me/password", auth, asyncHandler(changePasswordController));
export default Router;
