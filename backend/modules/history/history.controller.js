import {
  getProjectHistoryService,
  getTaskHistoryService,
  getUserHistoryService,
} from "./history.service.js";

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

  const result = await getTaskHistoryService(projectId, taskId);

  res.status(200).json({
    success: true,
    message: "Task history retrieved",
    data: result,
  });
};
export const getUserHistoryController = async (req, res) => {
  const userId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await getUserHistoryService(userId, page, limit);

  res.status(200).json({
    success: true,
    message: "History fetched",
    data: result,
  });
};
