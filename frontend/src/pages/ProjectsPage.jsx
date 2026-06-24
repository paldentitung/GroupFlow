import React, { useContext } from "react";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import NewProjectForm from "../components/NewProjectForm";
import MainButton from "../components/MainButton";
import { useProjects } from "../hooks/useProjects.js";
import { formatDate } from "../utils/formatDate.js";
import { useAddProject } from "../contexts/AddProjectContext.jsx";
import ProjectListing from "../components/ProjectListing.jsx";
import { useState } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext.jsx";
const ProjectsPage = () => {
  const { handleCreateProject, projects, loading } = useProjects();
  const { isModalOpen, setIsModalOpen } = useAddProject();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const { handleDeleteProject } = useContext(ProjectsContext);
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

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Project"
        className="max-w-sm"
      >
        <DeleteProjectConfirmation
          project={selectedProject}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteProject(selectedProject._id);
            setDeleteModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
const DeleteProjectConfirmation = ({ project, onCancel, onConfirm }) => {
  return (
    <div className="space-y-5">
      <div>
        <p className="mt-2  text-gray-600 leading-relaxed text-center">
          Are you sure you want to delete ?
        </p>
      </div>

      <div className="flex justify-end gap-3  pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};
export default ProjectsPage;
