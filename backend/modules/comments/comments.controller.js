import { getIO } from "../../config/socket.js";
import {
  getCommentsService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from "./comments.service.js";

export const getCommentsController = async (req, res) => {
  const { taskId } = req.params;

  const result = await getCommentsService(taskId);

  res.status(200).json({
    success: true,
    message: "Comments fetched",
    data: result,
  });
};

export const createCommentController = async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;

  const { comment, projectId } = await createCommentService(
    taskId,
    content,
    req.user._id,
  );

  const io = getIO();
  io.to(`task:${taskId}`).emit("commentCreated", {
    taskId,
    comment,
  });

  res.status(201).json({
    success: true,
    message: "Comment created",
    data: comment,
  });
};

export const updateCommentController = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  const result = await updateCommentService(commentId, content, req.user._id);

  res.status(200).json({
    success: true,
    message: "Comment updated",
    data: result,
  });
};

export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params;

  await deleteCommentService(commentId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Comment deleted",
  });
};
