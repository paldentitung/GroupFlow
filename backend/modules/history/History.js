import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    entity: {
      type: String,
      enum: ["task", "project", "comment", "member"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: ["created", "updated", "deleted", "assigned", "completed"],
      required: true,
    },
    details: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const History = mongoose.model("History", historySchema);
export default History;
