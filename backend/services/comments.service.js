import Task from "../models/Task.js";
import Comment from "../models/Comment.js";
import AppError from "../utils/AppError.js";

import { createHistoryService } from "./history.service.js";
export const getCommentsService = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const comments = await Comment.find({ taskId })
    .populate("authorId", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  return await comment.populate("authorId", "firstName lastName avatar");
};

export const createCommentService = async (taskId, content, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const comment = await Comment.create({
    content,
    authorId: userId,
    taskId,
  });

  await createHistoryService({
    userId,
    projectId: task.projectId,
    entity: "comment",
    entityId: comment._id,
    action: "created",
    details: `Comment added on task "${task.title}"`,
  });

  return comment;
};

export const updateCommentService = async (commentId, content, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (!comment.authorId.equals(userId)) {
    throw new AppError("You can only edit your own comments", 403);
  }

  comment.content = content;
  await comment.save();

  return comment;
};

export const deleteCommentService = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (!comment.authorId.equals(userId)) {
    throw new AppError("You can only delete your own comments", 403);
  }

  await comment.deleteOne();
};
