import History from "../models/History.js";

export const getProjectHistoryService = async (projectId, query) => {
  const { entity, action, user } = query;

  const filter = { project: projectId };

  if (entity) filter.entity = entity;
  if (action) filter.action = action;
  if (user) filter.user = user;

  return await History.find(filter)
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });
};

export const getTaskHistoryService = async (projectId, taskId) => {
  return await History.find({
    project: projectId,
    entity: "task",
    entityId: taskId,
  })
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });
};

export const getUserHistoryService = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const historys = await History.find({ user: userId })
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await History.countDocuments({ user: userId });

  return {
    historys,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createHistoryService = async ({
  userId,
  projectId,
  entity,
  entityId,
  action,
  details,
}) => {
  return await History.create({
    user: userId,
    project: projectId,
    entity,
    entityId,
    action,
    details,
  });
};
