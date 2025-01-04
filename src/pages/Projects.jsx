import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="mt-10 lg:mt-20 lg:flex justify-between">
      <h1 className="text-3xl font-bold sticky mb-8">Projects</h1>
      <div>
        <div className="flex flex-col space-y-8">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}

export default Projects;
