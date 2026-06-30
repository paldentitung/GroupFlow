import Task from "../tasks/Task.js";
import Comment from "./Comment.js";
import AppError from "../../utils/AppError.js";
import User from "../users/User.js";
import { createHistoryService } from "../history/history.service.js";
import { createNotificationService } from "../notifications/notification.service.js";
import { extractUsernames } from "../../utils/extractUsernames.js";
export const getCommentsService = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const comments = await Comment.find({ taskId })
    .populate("authorId", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  return comments;
};

export const createCommentService = async (taskId, content, userId) => {
  const task = await Task.findById(taskId);
  if (!task) throw new AppError("Task not found", 404);

  const usernames = extractUsernames(content);
  const mentionedUsers = await getMentionedUsers(usernames);
  const mentionedUserIds = mentionedUsers.map((u) => u._id);

  const comment = await Comment.create({
    content,
    authorId: userId,
    taskId,
    mentions: mentionedUserIds,
  });

  await createHistoryService({
    userId,
    projectId: task.projectId,
    taskId: task._id,
    entity: "comment",
    entityId: comment._id,
    action: "created",
    details: `Comment added with mentions`,
  });

  for (const user of mentionedUsers) {
    await createNotificationService({
      recipientId: user._id,
      senderId: userId,
      projectId: task.projectId,
      type: "mention",
      message: `You were mentioned in task "${task.title}"`,
    });
  }

  const populatedComment = await Comment.findById(comment._id).populate(
    "authorId",
    "firstName lastName avatar",
  );

  return { comment: populatedComment, projectId: task.projectId };
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

const getMentionedUsers = async (usernames) => {
  if (!usernames.length) {
    return [];
  }

  return await User.find({
    $or: usernames.map((u) => ({
      $expr: {
        $regexMatch: {
          input: {
            $toLower: {
              $replaceAll: {
                input: { $concat: ["$firstName", "$lastName"] },
                find: " ",
                replacement: "",
              },
            },
          },
          regex: u.toLowerCase(),
        },
      },
    })),
  });
};
