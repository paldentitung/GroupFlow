import {
  createProjectService,
  getProjectsService,
  updateProjectService,
  deleteProjectService,
} from "./projects.service.js";

export const getProjectsController = async (req, res) => {
  const result = await getProjectsService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Projects retrieved successfully",
    projects: result,
  });
};

export const createProjectController = async (req, res) => {
  const newProject = await createProjectService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: newProject,
  });
};
export const updateProjectController = async (req, res) => {
  const { projectId } = req.params;

  const updatedProject = await updateProjectService(projectId, req.body);

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: updatedProject,
  });
};

export const deleteProjectController = async (req, res) => {
  const { projectId } = req.params;

  const deletedProject = await deleteProjectService(projectId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    project: deletedProject,
  });
};
