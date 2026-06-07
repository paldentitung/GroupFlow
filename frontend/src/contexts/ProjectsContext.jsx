import { createContext, useState, useEffect } from "react";
import { getProjects, deleteProject } from "../services/projectsService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(
    () => JSON.parse(localStorage.getItem("activeProject")) || null,
  );
  const navigate = useNavigate();

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const fetchProjects = async () => {
    const projectsData = await getProjects();
    console.log("projectsData:", projectsData);
    setProjects(projectsData.projects);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      if (response.success) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
        toast.success(response.message || "Project deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.message || "Failed to delete project");
    }
  };

  const handleSetActiveProject = (project) => {
    setActiveProject(project);
    localStorage.setItem("activeProject", JSON.stringify(project));
    navigate(`/projects/${project._id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        fetchProjects,
        handleDeleteProject,
        activeProject,
        handleSetActiveProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
