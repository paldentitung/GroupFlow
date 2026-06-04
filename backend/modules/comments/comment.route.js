import express from "express";
import {
  getCommentsController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from "./comments.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import auth from "../../middleware/auth.middleware.js";
import { commentLimiter } from "../../utils/rateLimiter.js";

const Router = express.Router();

Router.get("/:taskId/comments", auth, asyncHandler(getCommentsController));
Router.post(
  "/:taskId/comments",
  auth,
  commentLimiter,
  asyncHandler(createCommentController),
);

Router.patch("/:commentId", auth, asyncHandler(updateCommentController));
Router.delete("/:commentId", auth, asyncHandler(deleteCommentController));
export default Router;
