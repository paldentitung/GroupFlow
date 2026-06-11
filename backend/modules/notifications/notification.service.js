import Notification from "./Notification.js";
import AppError from "../../utils/AppError.js";
import User from "../users/User.js";
export const getUserNotificatonService = async (userId) => {
  return await Notification.find({ recipient: userId });
};

export const markAsReadService = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true },
  );

  if (!notification) throw new AppError("Notification not found", 404);

  return notification;
};

export const markAllAsReadService = async (userId) => {
  const result = await Notification.updateMany(
    { recipient: userId, isRead: false },
    { $set: { isRead: true } },
  );

  return result;
};

export const createNotificationService = async ({
  recipientId,
  senderId,
  projectId,
  type,
  message,
  link,
}) => {
  const recipient = await User.findById(recipientId);

  // check preference before creating
  const prefs = recipient?.notificationPreferences;

  if (prefs) {
    if (type === "task_assigned" && !prefs.taskAssigned) return;
    if (type === "task_completed" && !prefs.projectStatus) return;
    if (type === "new_comment" && !prefs.newComment) return;
    if (type === "deadline_reminder" && !prefs.deadlineReminder) return;
  }

  const notification = await Notification.create({
    recipient: recipientId,
    sender: senderId,
    projectId,
    type,
    message,
    link,
  });

  return notification;
};
