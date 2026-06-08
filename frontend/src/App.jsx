import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./mainlayout/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import MyTasksPage from "./pages/MyTasksPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import { SidebarProvider } from "./contexts/SidebarContext";
import TaskSidebar from "./components/TaskSidebar";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AcceptInvitePage from "./pages/AcceptInvitePage";
import { Toaster } from "react-hot-toast";
import HistoryPage from "./pages/HistoryPage";
import TasksPage from "./pages/TasksPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
const App = () => {
  return (
    <SidebarProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1d23",
            color: "#f9fafb",
            fontSize: "13px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.06)",
            maxWidth: "360px",
          },
          success: {
            style: { border: "1px solid rgba(5,150,105,0.4)" },
            iconTheme: { primary: "#34d399", secondary: "#1a1d23" },
          },
          error: {
            style: { border: "1px solid rgba(220,38,38,0.4)" },
            iconTheme: { primary: "#f87171", secondary: "#1a1d23" },
          },
          loading: {
            style: { border: "1px solid rgba(79,70,229,0.4)" },
            iconTheme: { primary: "#818cf8", secondary: "#1a1d23" },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/accept-invite/:token" element={<AcceptInvitePage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
          path="/my-tasks"
          element={
            <MainLayout>
              <MyTasksPage />
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
        />{" "}
        <Route
          path="/history"
          element={
            <MainLayout>
              <HistoryPage />
            </MainLayout>
          }
        />
      </Routes>
    </SidebarProvider>
  );
};

export default App;
