import Notification from "../models/Notification.js";
import AppError from "../utils/AppError.js";
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
export const createNotificationService = async ({
  recipientId,
  senderId,
  projectId = null,
  type,
  message,
  link = null,
}) => {
  return await Notification.create({
    recipient: recipientId,
    sender: senderId,
    project: projectId,
    type,
    message,
    link,
  });
};
