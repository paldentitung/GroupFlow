import request from "./api";

export const getUserNotification = async () => {
  return request("/notification", {}, true);
};
export const markAsReadNotification = async (notificationId) => {
  return request(
    "/notification",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId }),
    },
    true,
  );
};
export const markAllReadNotification = async () => {
  return request(
    "/notification/read-all",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
    true,
  );
};
