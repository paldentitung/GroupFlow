import React from "react";
import Header from "../components/Header";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
const ProjectsPage = () => {
  return (
    <div>
      <Header title="Projects" buttonName="New Project" />
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
