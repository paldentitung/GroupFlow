import Task from "../models/Task.js";
import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

export const getTasksService = async (projectId) => {
  const tasks = await Task.find({ projectId })
    .populate("assigneeId", "firstName lastName avatar")
    .populate("createdBy", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  return tasks;
};

export const getTaskByIdService = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("assigneeId", "firstName lastName avatar")
    .populate("createdBy", "firstName lastName avatar");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

export const getCurrentUserTasksService = async (userId) => {
  const tasks = await Task.find({
    assigneeId: userId,
  })
    .populate("assigneeId", "firstName lastName avatar")
    .populate("projectId", "name")
    .sort({ createdAt: -1 });

  return tasks;
};

export const createTaskService = async (
  projectId,
  title,
  description,
  dueDate,
  priority,
  assigneeId,
  userId,
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  //   const isMember = project.members.some((m) => m.user.equals(userId));
  //   if (!isMember) {
  //     throw new Error("You are not a member of this project");
  //   }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    assigneeId,
    projectId,
    createdBy: userId,
  });

  return task;
};

export const updateTaskService = async (taskId, updateData, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // Check if user is the creator or assignee of the task
  if (
    !task.createdBy.equals(userId) &&
    (!task.assigneeId || !task.assigneeId.equals(userId))
  ) {
    throw new AppError("You do not have permission to update this task", 403);
  }

  const allowedFields = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
    "assigneeId",
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      task[field] = updateData[field];
    }
  });
  await task.save();

  return task;
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const project = await Project.findById(task.projectId);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.equals(userId);
  const isCreator = task.createdBy.equals(userId);

  if (!isOwner && !isCreator) {
    throw new AppError("You do not have permission to delete this task", 403);
  }

  await task.deleteOne();
};
export const respondToTaskService = async (taskId, userId, response) => {
  const task = await Task.findById(taskId);
  if (!task) throw new AppError("Task not found", 404);

  // Only the assignee can accept/reject
  if (!task.assigneeId || !task.assigneeId.equals(userId)) {
    throw new AppError("You are not the assignee of this task", 403);
  }

  if (!["accepted", "rejected"].includes(response)) {
    throw new AppError(
      "Invalid response. Must be 'accepted' or 'rejected'",
      400,
    );
  }

  task.acceptanceStatus = response;

  //  auto-update status when accepted
  if (response === "accepted") {
    task.status = "in_progress";
  }

  await task.save();
  return task;
};
