import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="mt-10 lg:mt-20 lg:flex justify-between">
      <h1 className="text-3xl font-semibold sticky mb-8 dark:text-white">Projects</h1>
      <div>
        <div className="flex flex-col space-y-8">
          <ProjectCard 
              title="Whisper" 
              description='A web application allowing students to share opinions and participate in
              discussions without revealing their identities & addressing privacy concerns effectively.' 
              startDate='Sep 2024' 
              endDate='Ongoing' 
              techStack={['React JS','Node JS','TailwindCSS']}
              link='https://github.com/rushil-b-patel/Whisper'
          />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}

export default Projects;
