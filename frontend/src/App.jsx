import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./mainlayout/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import { SidebarProvider } from "./contexts/SidebarContext";
import TaskSidebar from "./components/TaskSidebar";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <SidebarProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <MainLayout>
              <ProjectsPage />
            </MainLayout>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <MainLayout>
              <ProjectDetailsPage />
            </MainLayout>
          }
        >
          <Route path="task/:taskId" element={<TaskSidebar />} />
        </Route>

        <Route
          path="/tasks"
          element={
            <MainLayout>
              <TasksPage />
            </MainLayout>
          }
        />
        <Route
          path="/team"
          element={
            <MainLayout>
              <TeamPage />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          }
        />
      </Routes>
    </SidebarProvider>
  );
};

export default App;
