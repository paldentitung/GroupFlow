import Task from "./Task.js";
import Project from "../projects/Project.js";
import AppError from "../../utils/AppError.js";
import { createHistoryService } from "../history/history.service.js";
import { createNotificationService } from "../notifications/notification.service.js";

// export const getTasksService = async (projectId) => {
//   const tasks = await Task.find({ projectId })
//     .populate("assigneeId", "firstName lastName avatar")
//     .populate("createdBy", "firstName lastName avatar")
//     .sort({ createdAt: -1 });

//   return tasks;
// };

export const getTasksService = async (projectId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Task.countDocuments({ projectId });

  const tasks = await Task.find({ projectId })
    .populate("projectId", "name")
    .populate("assigneeId", "firstName lastName avatar bio phone")
    .populate("createdBy", "firstName lastName avatar bio phone")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

export const getCurrentUserTasksService = async (
  userId,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  const tasks = await Task.find({ assigneeId: userId })
    .populate("assigneeId", "firstName lastName avatar")
    .populate("projectId", "name")
    .sort({ createdAt: -1 });

  // filter out orphaned tasks (project was deleted)
  const validTasks = tasks.filter((t) => t.projectId !== null);

  const paginated = validTasks.slice(skip, skip + limit);

  return {
    tasks: paginated,
    pagination: {
      total: validTasks.length,
      page,
      limit,
      totalPages: Math.ceil(validTasks.length / limit),
    },
  };
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

  await createHistoryService({
    userId,
    projectId,
    taskId: task._id,
    entity: "task",
    entityId: task._id,
    action: "created",
    details: `Task "${task.title}" was created`,
  });

  if (assigneeId) {
    await createNotificationService({
      recipientId: assigneeId,
      senderId: userId,
      projectId,
      type: "task_assigned",
      message: `You have been assigned to task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task._id}`,
    });
  }
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

  if (
    updateData.assigneeId &&
    !task.assigneeId?.equals(updateData.assigneeId)
  ) {
    await createNotificationService({
      recipientId: updateData.assigneeId,
      senderId: userId,
      projectId: task.projectId,
      type: "task_assigned",
      message: `You have been assigned to task "${task.title}"`,
      link: `/projects/${task.projectId}/tasks/${task._id}`,
    });
  }
  if (updateData.status === "completed") {
    const project = await Project.findById(task.projectId);
    await createNotificationService({
      recipientId: project.owner,
      senderId: userId,
      projectId: task.projectId,
      type: "task_completed",
      message: `Task "${task.title}" has been completed`,
      link: `/projects/${task.projectId}/tasks/${task._id}`,
    });
  }
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
