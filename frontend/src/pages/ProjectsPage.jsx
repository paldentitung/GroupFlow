import React from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import NewProjectForm from "../components/NewProjectForm";
import MainButton from "../components/MainButton";
import { useProjects } from "../hooks/useProjects.js";
import { formatDate } from "../utils/formatDate.js";
import { useAddProject } from "../contexts/AddProjectContext.jsx";
const ProjectsPage = () => {
  const { handleCreateProject, projects } = useProjects();
  const { isModalOpen, setIsModalOpen } = useAddProject();
  return (
    <>
      <div>
        <Header
          title="Projects"
          buttonName="New Project"
          onClick={() => setIsModalOpen(true)}
        />
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {projects.map((p) => (
              <ProjectCard
                key={p._id}
                id={p._id}
                name={p.name}
                desc={p.description}
                status={p.status}
                progress={p.progress}
                due={formatDate(p.dueDate)}
                members={p.members}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
