import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProjectsProvider } from "./contexts/ProjectsContext.jsx";
import { TasksProvider } from "./contexts/TasksContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AddProjectProvider } from "./contexts/AddProjectContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <NotificationProvider>
            <TasksProvider>
              <AddProjectProvider>
                <App />
              </AddProjectProvider>
            </TasksProvider>
          </NotificationProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
