import {
  getUserNotificatonService,
  markAsReadService,
  markAllAsReadService,
} from "./notification.service.js";

export const getUserNotificatonController = async (req, res) => {
  const result = await getUserNotificatonService(req.user._id);
  res
    .status(200)
    .json({ success: true, message: "Notification fetched", data: result });
};

export const markAsReadController = async (req, res) => {
  const { notificationId } = req.body;
  const result = await markAsReadService(notificationId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Notification mark as read",
    data: result,
  });
};

export const markAllAsReadController = async (req, res) => {
  const userId = req.user._id;

  const result = await markAllAsReadService(userId);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
    data: result,
  });
};
