import ProjectCard from "../components/ProjectCard";

function Projects() {

  const Projects = [
    {
      title: "BuildFlow",
      description: 'Designed and implemented a scalable and reliable architecture with isolated upload and deploy server for building and deploying the application.',
      startDate: 'Oct 2024',
      endDate: 'Nov 2024',
      techStack: ['Node JS', 'Cloudflare', 'Redis'],
      codeLink: 'https://github.com/rushil-b-patel/Build-Flow',
      progress: 100,
    },
    {
      title: "Whisper",
      description: 'A web application allowing students to share opinions and participate in discussions without revealing their identities & addressing privacy concerns effectively.',
      startDate: 'Sep 2024',
      endDate: 'Ongoing',
      techStack: ['React JS', 'Node JS', 'MongoDB', 'T-CSS'],
      codeLink: 'https://github.com/rushil-b-patel/Whisper',
      progress: 70,
    },
    {
      title: "EventEase",
      description: 'A web application designed for organizations to showcase upcoming events, seminars, and lectures with detailed insights.',
      startDate: 'Jan 2024',
      endDate: 'April 2024',
      techStack: ['Next JS', 'TypeScript', 'MongoDB', 'T-CSS'],
      liveLink: 'https://eventease-rho.vercel.app/',
      codeLink: 'https://github.com/rushil-b-patel/Event-Ease',
      progress: 100
    },
    {
      title: "Git Shit",
      description: 'A comprehensive guide to fix common git mistakes. Find solutions and commands for recovering from errors, undoing commits, switching branches, and more.',
      startDate: 'Jan 2024',
      endDate: 'evergoing',
      techStack: ['git'],
      codeLink: 'https://github.com/rushil-b-patel/git-shit',
      progress: 100
    }
  ]

  return (
    <div className="my-10 lg:flex justify-around mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
         {Projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              startDate={project.startDate}
              endDate={project.endDate}
              techStack={project.techStack}
              codeLink={project.codeLink}
              liveLink={project.liveLink}
              progress={project.progress}
            />
         ))}
      </div>
    </div>
  );
}

export default Projects;
