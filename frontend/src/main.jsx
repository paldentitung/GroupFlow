import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProjectsProvider } from "./contexts/ProjectsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </BrowserRouter>
  </StrictMode>,
);
