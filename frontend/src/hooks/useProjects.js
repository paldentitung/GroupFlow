import { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext.jsx";
import { createProject } from "../services/projectsService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useProjects = () => {
  const { addProject, projects } = useContext(ProjectsContext);
  const navigate = useNavigate();
  const handleCreateProject = async (projectData) => {
    try {
      const response = await createProject(projectData);
      if (response.success) {
        console.log("created project response:", response);
        addProject(response.project);
        toast.success(response.message || "Project Created");
        navigate("/projects");
      }
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
