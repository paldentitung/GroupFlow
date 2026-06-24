import notificationSound from "../sounds/notification.mp3";

const audio = new Audio(notificationSound);

export const playNotificationSound = () => {
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.error("Failed to play notification sound:", error);
  });
};
