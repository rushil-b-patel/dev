import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {

  const projectsList = [
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
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      {projectsList.map((project, index) => (
        <div key={index} className="group relative bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  title="View Code"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  title="View Live Site"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span>{project.startDate} - {project.endDate}</span>
            <span>{project.progress}% Complete</span>
          </div>
        </div>
      ))}
    </div>
  );
}
