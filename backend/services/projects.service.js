import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

// Only return projects where the user is a member
export const getProjectsService = async (userId) => {
  const projects = await Project.find({
    "members.user": userId,
  }).populate("members.user", "firstName lastName avatar");
  return projects;
};

export const createProjectService = async (projectData) => {
  const newProject = new Project({ ...projectData });
  return await newProject.save();
};

export const updateProjectService = async (projectId, updateData) => {
  // ✅ use .save() so pre("save") hook fires
  const project = await Project.findById(projectId);

  if (!project) throw new AppError("Project not found", 404);

  Object.assign(project, updateData);
  return await project.save();
};

export const deleteProjectService = async (projectId) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) throw new AppError("Project not found", 404);

  return deletedProject;
};
