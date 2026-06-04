import React from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import NewProjectForm from "../components/NewProjectForm";
import MainButton from "../components/MainButton";
import { useProjects } from "../hooks/useProjects.js";
import { formatDate } from "../utils/formatDate.js";
import { useAddProject } from "../contexts/AddProjectContext.jsx";
import ProjectListing from "../components/ProjectListing.jsx";
const ProjectsPage = () => {
  const { handleCreateProject, projects, loading } = useProjects();
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
          <ProjectListing projects={projects} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
