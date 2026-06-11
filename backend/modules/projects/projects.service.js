import Project from "./Project.js";
import AppError from "../../utils/AppError.js";
import { createHistoryService } from "../history/history.service.js";
import Task from "../tasks/Task.js";
import mongoose from "mongoose";
import History from "../history/History.js";
import Notification from "../notifications/Notification.js";
// Only return projects where the user is a member
export const getProjectsService = async (userId) => {
  const projects = await Project.find({ "members.user": userId })
    .populate("owner", "firstName lastName email avatar")
    .populate("members.user", "firstName lastName email avatar")
    .lean();

  const projectIds = projects.map((p) => p._id);

  const taskStats = await Task.aggregate([
    { $match: { projectId: { $in: projectIds } } },
    {
      $group: {
        _id: "$projectId",
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
      },
    },
  ]);

  const statsMap = Object.fromEntries(
    taskStats.map((s) => [s._id.toString(), s]),
  );

  return projects.map((p) => {
    const stats = statsMap[p._id.toString()];
    const total = stats?.total ?? 0;
    const completed = stats?.completed ?? 0;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...p, progress };
  });
};
export const createProjectService = async (projectData, userId) => {
  const newProject = new Project({
    name: projectData.name,
    description: projectData.description,
    status: projectData.status || "Active",
    startDate: projectData.startDate,
    dueDate: projectData.dueDate,
    owner: userId,
    members: [
      {
        user: userId,
        role: "Owner",
      },
    ],
  });
  await createHistoryService({
    userId,
    projectId: newProject._id,
    entity: "project",
    entityId: newProject._id,
    action: "created",
    details: `Project "${newProject.name}" was created`,
  });

  return newProject.save();
};

export const updateProjectService = async (projectId, updateData, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError("Project not found", 404);

  Object.assign(project, updateData);

  await createHistoryService({
    userId,
    projectId,
    entity: "project",
    entityId: projectId,
    action: "updated",
    details: `Project "${project.name}" was updated`,
  });

  return await project.save();
};

export const deleteProjectService = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError("Project not found", 404);

  if (!project.owner.equals(userId)) {
    throw new AppError("You are not the owner of this project", 403);
  }

  await createHistoryService({
    userId,
    projectId,
    entity: "project",
    entityId: projectId,
    action: "deleted",
    details: `Project "${project.name}" was deleted`,
  });

  // cascade
  await Task.deleteMany({ project: projectId });
  await History.deleteMany({ project: projectId });
  await Notification.deleteMany({ project: projectId });

  await project.deleteOne();
  return project;
};
