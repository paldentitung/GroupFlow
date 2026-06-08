import { createContext, useState, useEffect, useContext } from "react";
import { getProjects, deleteProject } from "../services/projectsService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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
    setProjects(projectsData.projects);

    // sync activeProject with fresh data
    setActiveProject((prev) => {
      if (!prev) return projectsData.projects[0] ?? null;
      const fresh = projectsData.projects.find((p) => p._id === prev._id);
      return fresh ?? projectsData.projects[0] ?? null;
    });
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
    if (!user) {
      setProjects([]);
      setActiveProject(null);
      localStorage.removeItem("activeProject");
      return;
    }
    fetchProjects();
  }, [user]);

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
