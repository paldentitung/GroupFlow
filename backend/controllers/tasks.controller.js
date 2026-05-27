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
