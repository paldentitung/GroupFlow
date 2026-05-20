import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

export const getProjectsService = async () => {
  const projects = await Project.find();
  return projects;
};
export const createProjectService = async (projectData) => {
  const newProject = new Project({ ...projectData });
  return await newProject.save();
};
export const updateProjectService = async (projectId, updateData) => {
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    updateData,
    { new: true, runValidators: true },
  );

  if (!updatedProject) {
    throw new AppError("Project not found", 404);
  }

  return updatedProject;
};
export const deleteProjectService = async (projectId) => {
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw new AppError("Project not found", 404);
  }

  return deletedProject;
};
