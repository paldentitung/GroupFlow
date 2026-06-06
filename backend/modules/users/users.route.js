import express from "express";
import { updateUserProfileController } from "./users.controller.js";
import auth from "../../middleware/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
const Router = express.Router();

Router.patch(
  "/update-profile",
  auth,
  asyncHandler(updateUserProfileController),
);

export default Router;
