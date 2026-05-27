import Task from "../models/Task.js";
import Comment from "../models/Comment.js";
export const getCommentsController = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const comments = await Comment.find({ taskId })
    .populate("authorId", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Comments fetched",
    data: comments,
  });
};

export const createCommentController = async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const comment = await Comment.create({
    content,
    authorId: req.user._id,
    taskId,
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

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  if (!comment.authorId.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You can only edit your own comments",
    });
  }

  comment.content = content;
  await comment.save();

  res.status(200).json({
    success: true,
    message: "Comment updated",
    data: comment,
  });
};

export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  if (!comment.authorId.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own comments",
    });
  }

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment deleted",
  });
};
