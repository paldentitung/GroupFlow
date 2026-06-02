import { createContext, useState, useEffect } from "react";
import { getProjects, deleteProject } from "../services/projectsService";
import { toast } from "react-hot-toast";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, fetchProjects, handleDeleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
