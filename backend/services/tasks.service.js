import Task from "../models/Task.js";
import Project from "../models/Project.js";

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
    throw new Error("Task not found");
  }

  return task;
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
    throw new Error("Project not found");
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
    throw new Error("Task not found");
  }

  // Check if user is the creator or assignee of the task
  if (
    !task.createdBy.equals(userId) &&
    (!task.assigneeId || !task.assigneeId.equals(userId))
  ) {
    throw new Error("You do not have permission to update this task");
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
    throw new Error("Task not found");
  }

  const project = await Project.findById(task.projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const isOwner = project.owner.equals(userId);
  const isCreator = task.createdBy.equals(userId);

  if (!isOwner && !isCreator) {
    throw new Error("You do not have permission to delete this task");
  }

  await task.deleteOne();
};
