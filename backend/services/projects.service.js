import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";
import { createHistoryService } from "./history.service.js";
// Only return projects where the user is a member
export const getProjectsService = async (userId) => {
  const projects = await Project.find({
    "members.user": userId,
  })
    .populate("owner", "firstName lastName email")
    .populate("members.user", "firstName lastName email");

  return projects;
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

export const updateProjectService = async (projectId, updateData) => {
  // ✅ use .save() so pre("save") hook fires
  const project = await Project.findById(projectId);

  if (!project) throw new AppError("Project not found", 404);

  Object.assign(project, updateData);
  return await project.save();
};

export const deleteProjectService = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) throw new AppError("Project not found", 404);

  if (!project.owner.equals(userId)) {
    throw new AppError("You are not the owner of this project", 403);
  }

  await project.deleteOne();
  return project;
};
