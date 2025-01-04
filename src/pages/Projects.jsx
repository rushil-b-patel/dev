import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="mt-10 lg:mt-20 lg:flex justify-between">
      <h1 className="text-3xl font-bold sticky mb-8 dark:text-white">Projects</h1>
      <div>
        <div className="flex flex-col space-y-8">
          <ProjectCard 
              title="Whisper" 
              description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio inventore minima laborum rem voluptatum incidunt voluptatem molestias fugit nostrum. Unde ut iure omnis obcaecati odio soluta nemo velit magni delectus.' 
              startDate='19-10-2024' 
              endDate='19-12-2024' 
              techStack={['React JS','Node JS','TCSS']}
              link='https://github.com/rushil-b-patel/Whisper'
          />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}

export default Projects;
