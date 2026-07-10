import React, { useContext, useState } from "react";
import Header from "../components/Header";
import ProjectListing from "../components/ProjectListing";
import ConfirmModal from "../components/ConfirmModal";
import { useProjects } from "../hooks/useProjects";
import { useAddProject } from "../contexts/AddProjectContext";
import { ProjectsContext } from "../contexts/ProjectsContext";

const ProjectsPage = () => {
  const { projects, loading } = useProjects();
  const { setIsModalOpen } = useAddProject();
  const { handleDeleteProject } = useContext(ProjectsContext);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div>
        <Header
          title="Projects"
          buttonName="New Project"
          onClick={() => setIsModalOpen(true)}
        />

        <div className="p-6">
          <ProjectListing
            projects={projects}
            loading={loading}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          await handleDeleteProject(selectedProject._id);
          setDeleteModalOpen(false);
        }}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
        confirmText="Delete Project"
        danger
      />
    </>
  );
};

export default ProjectsPage;
