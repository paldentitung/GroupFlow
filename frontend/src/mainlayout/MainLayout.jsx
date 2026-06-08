import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useProjects } from "../hooks/useProjects";
import Modal from "../components/Modal";
import NewProjectForm from "../components/NewProjectForm";
import { useContext } from "react";
import { useAddProject } from "../contexts/AddProjectContext";
import NotificationPanel from "../components/NotificationPanel";
import { useNotifications } from "../contexts/NotificationContext";
const MainLayout = ({ children }) => {
  const { isModalOpen, setIsModalOpen } = useAddProject();
  const {
    open,
    setOpen,
    notifications,
    handleMarkAsReadNotification,
    handleMarkAllReadNotification,
  } = useNotifications();
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
        className="max-w-md"
      >
        <div className="z-50">
          <NewProjectForm onCancel={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* PANEL */}
          <div className="absolute right-0 top-0 h-full">
            <NotificationPanel
              notifications={notifications}
              onReadSingle={handleMarkAsReadNotification}
              onReadAll={handleMarkAllReadNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MainLayout;
