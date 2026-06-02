import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTaskByIdService,
  respondToTaskService,
} from "../services/tasks.service.js";

export const getTasksController = async (req, res) => {
  const { projectId } = req.params;

  const results = await getTasksService(projectId);

  res.status(200).json({
    success: true,
    message: "Tasks fetched",
    data: results,
  });
};

export const getTaskByIdController = async (req, res) => {
  const { taskId } = req.params;

  const result = await getTaskByIdService(taskId);

  res.status(200).json({
    success: true,
    message: "Task fetched",
    data: result,
  });
};

export const createTaskController = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, dueDate, priority, assigneeId } = req.body;

  const result = await createTaskService(
    projectId,
    title,
    description,
    dueDate,
    priority,
    assigneeId,
    req.user._id,
  );

  res.status(201).json({
    success: true,
    message: "Task created",
    data: result,
  });
};

export const updateTaskController = async (req, res) => {
  const { taskId } = req.params;
  const updateData = req.body;

  const result = await updateTaskService(taskId, updateData, req.user._id);
  res.status(200).json({
    success: true,
    message: "Task updated",
    data: result,
  });
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  await deleteTaskService(taskId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};
export const respondToTaskController = async (req, res) => {
  const { taskId } = req.params;
  const { response } = req.body;
  const userId = req.user._id;

  const task = await respondToTaskService(taskId, userId, response);
  res.status(200).json({ success: true, data: task });
};
