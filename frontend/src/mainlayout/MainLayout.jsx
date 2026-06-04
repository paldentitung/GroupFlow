import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useProjects } from "../hooks/useProjects";
import Modal from "../components/Modal";
import NewProjectForm from "../components/NewProjectForm";
import { useContext } from "react";
import { useAddProject } from "../contexts/AddProjectContext";
const MainLayout = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useAddProject();
  return (
    <>
      <div className="flex">
        <aside>
          <Sidebar />
        </aside>
        <main className="bg-(--color-bg)  min-h-screen overflow-hidden  flex-2 md:ml-64">
          {children}
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New project"
      >
        <NewProjectForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default MainLayout;
