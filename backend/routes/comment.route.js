import express from "express";
import {
  getCommentsController,
  createCommentController,
  updateCommentController,
  deleteCommentController,
} from "../controllers/comments.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import auth from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.get("/:taskId/comments", auth, asyncHandler(getCommentsController));
Router.post("/:taskId/comments", auth, asyncHandler(createCommentController));

Router.patch("/:commentId", auth, asyncHandler(updateCommentController));
Router.delete("/:commentId", auth, asyncHandler(deleteCommentController));
export default Router;
