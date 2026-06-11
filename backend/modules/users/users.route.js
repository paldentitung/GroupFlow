import express from "express";
import {
  changeAvatarConroller,
  changePasswordController,
  removeAvatarConroller,
  updateUserProfileController,
  getMeController,
  updateNotificationPreferences,
} from "./users.controller.js";
import auth from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../middleware/upload.middleware.js";
import { changeAvatarLimiter } from "../../utils/rateLimiter.js";
const Router = express.Router();

Router.get("/me", auth, asyncHandler(getMeController));
Router.patch("/me", auth, asyncHandler(updateUserProfileController));

Router.patch(
  "/me/avatar",
  auth,
  changeAvatarLimiter,
  upload.single("avatar"),
  asyncHandler(changeAvatarConroller),
);

Router.delete("/me/avatar", auth, asyncHandler(removeAvatarConroller));

Router.patch("/me/password", auth, asyncHandler(changePasswordController));

Router.patch(
  "/me/notification-preferences",
  auth,
  updateNotificationPreferences,
);
export default Router;
