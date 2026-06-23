import { useContext, useState } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext.jsx";
import { createProject } from "../services/projectsService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const useProjects = () => {
  const {
    addProject,
    projects,
    activeProject,
    handleSetActiveProject,
    handleUpdateProject,
  } = useContext(ProjectsContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const handleCreateProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await createProject(projectData);
      if (response.success) {
        console.log("created project response:", response);
        addProject(response.project);
        toast.success(response.message || "Project Created");
        await fetchUser();
        navigate("/projects");
      }
      return response;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateProject,
    projects,
    loading,
    activeProject,
    handleSetActiveProject,
    handleUpdateProject,
  };
};
