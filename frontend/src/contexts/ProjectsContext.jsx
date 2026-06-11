import { createContext, useState, useEffect, useContext } from "react";
import {
  getProjects,
  deleteProject,
  updateProject,
} from "../services/projectsService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(() => {
    return JSON.parse(localStorage.getItem("activeProject")) || null;
  });
  const navigate = useNavigate();

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const fetchProjects = async () => {
    const projectsData = await getProjects();
    setProjects(projectsData.projects);

    setActiveProject((prev) => {
      const stored = JSON.parse(localStorage.getItem("activeProject"));

      const base = stored || prev;

      if (!base) return projectsData.projects[0] ?? null;

      const fresh = projectsData.projects.find((p) => p._id === base._id);

      return fresh ?? base ?? projectsData.projects[0] ?? null;
    });
  };
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      if (response.success) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));

        if (activeProject?._id === projectId) {
          setActiveProject(null);
          localStorage.removeItem("activeProject");
          navigate("/projects");
        }
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

  const handleUpdateProject = async (projectId, updateData) => {
    const previous = projects.find((p) => p._id === projectId);

    setProjects((prev) =>
      prev.map((p) => (p._id === projectId ? { ...p, ...updateData } : p)),
    );

    try {
      const response = await updateProject(projectId, updateData);
      if (response.success) {
        toast.success(response.message || "Project updated successfully");
      }
    } catch (error) {
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? previous : p)),
      );
      toast.error(error.message || "Failed to update project");
    }
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

  useEffect(() => {
    if (activeProject) {
      localStorage.setItem("activeProject", JSON.stringify(activeProject));
    }
  }, [activeProject]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        fetchProjects,
        handleDeleteProject,
        activeProject,
        handleSetActiveProject,
        handleUpdateProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
