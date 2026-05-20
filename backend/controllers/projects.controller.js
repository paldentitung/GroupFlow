import { success } from "zod";
import Project from "../models/Project.js";

export const getProjectsController = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ message: "Server error while retrieving projects" });
  }
};

export const createProjectController = async (req, res) => {
  try {
    const {
      name,
      description,
      owner,
      members,
      tasks,
      status,
      progress,
      startDate,
      dueDate,
      techStack,
    } = req.body;

    // Create a new project instance
    const newProject = new Project({
      name,
      description,
      owner,
      members,
      tasks,
      status,
      progress,
      startDate,
      dueDate,
      techStack,
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error while creating project" });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;

    const deleteProject = await Project.findByIdAndDelete(projectId);

    if (!deleteProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      deleteProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error while deleting project" });
  }
};
