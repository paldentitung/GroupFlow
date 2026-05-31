import { createContext, useState, useEffect } from "react";
import { getProjects } from "../services/projectsService";
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
