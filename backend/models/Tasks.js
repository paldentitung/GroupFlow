import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["todo", "in_progress", "completed", "overdue"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
taskSchema.index({ projectId: 1, status: 1 });
taskSchema.index({ assigneeId: 1, dueDate: 1 });
taskSchema.post("save", async function () {
  const Task = mongoose.model("Task");
  const Project = mongoose.model("Project");
  const tasks = await Task.find({ projectId: this.projectId });
  const done = tasks.filter((t) => t.status === "completed").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  await Project.findByIdAndUpdate(this.projectId, { progress: pct });
});
export const Task = mongoose.model("Task", taskSchema);
