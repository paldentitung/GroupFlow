import { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext.jsx";
import { createProject } from "../services/projectsService.js";

export const useProjects = () => {
  const { addProject, projects } = useContext(ProjectsContext);

  const handleCreateProject = async (projectData) => {
    try {
      const response = await createProject(projectData);
      console.log("created project response:", response);
      addProject(response.project);
      return response;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  return {
    handleCreateProject,
    projects,
  };
};
