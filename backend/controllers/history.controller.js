import {
  getProjectHistoryService,
  getTaskHistoryService,
  getUserHistoryService,
} from "../services/history.service.js";

export const getProjectHistoryController = async (req, res) => {
  const { projectId } = req.params;

  const result = await getProjectHistoryService(projectId, req.query);

  res.status(200).json({
    success: true,
    message: "Project history retrieved",
    ...result,
  });
};

export const getTaskHistoryController = async (req, res) => {
  const { projectId, taskId } = req.params;

  const result = await getTaskHistoryService(projectId, taskId, req.query);

  res.status(200).json({
    success: true,
    message: "Task history retrieved",
    ...result,
  });
};
export const getUserHistoryController = async (req, res) => {
  const result = await getUserHistoryService(req.user._id);

  res.status(200).json({
    success: true,
    message: "History fetched",
    data: result,
  });
};
