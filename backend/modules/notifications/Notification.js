import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_completed",
        "comment_added",
        "member_invited",
        "project_updated",
        "mention",
        "project_status",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      expires: 0,
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
