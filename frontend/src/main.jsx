import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProjectsProvider } from "./contexts/ProjectsContext.jsx";
import { TasksProvider } from "./contexts/TasksContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ProjectsProvider>
    </BrowserRouter>
  </StrictMode>,
);
