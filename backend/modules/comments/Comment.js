import mongoose from "mongoose";
import History from "../history/History.js";
const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);
commentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await History.deleteMany({ entityId: this._id, entity: "comment" });
  },
);
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
