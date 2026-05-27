import Task from "../models/Task.js";
import Project from "../models/Project.js";

// GET /api/projects/:projectId/tasks
export const getTasksController = async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ projectId })
    .populate("assigneeId", "firstName lastName avatar")
    .populate("createdBy", "firstName lastName avatar")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Tasks fetched",
    data: tasks,
  });
};

export const createTaskController = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, dueDate, priority, assigneeId } = req.body;

  // Check if project exists
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  // Check if user is a member of the project
  // const isMember = project.members.some((m) => m.user.equals(req.user._id));
  // if (!isMember) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "You are not a member of this project",
  //   });
  // }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    assigneeId,
    projectId,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created",
    data: task,
  });
};

export const updateTaskController = async (req, res) => {
  const { taskId } = req.params;
  const updateData = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Check if user is the creator or assignee of the task
  if (
    !task.createdBy.equals(req.user._id) &&
    (!task.assigneeId || !task.assigneeId.equals(req.user._id))
  ) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to update this task",
    });
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

  res.status(200).json({
    success: true,
    message: "Task updated",
    data: task,
  });
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Check if user is the creator of the task
  if (!task.createdBy.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to delete this task",
    });
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};
