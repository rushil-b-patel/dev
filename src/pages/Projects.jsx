import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="lg:flex justify-center gap-14 m-10">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="items-center justify-center ml-20 grid grid-cols-2 gap-6">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
      </div>
    </div>
  );
}

export default Projects;
