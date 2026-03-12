import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const projectsList = [
  {
    title: "BuildFlow",
    description: "Scalable architecture with isolated upload and deploy servers for building and deploying applications end-to-end.",
    period: "Oct 2024 — Nov 2024",
    techStack: ["Node.js", "Cloudflare", "Redis"],
    liveLink: null,
    codeLink: "https://github.com/rushil-b-patel/Build-Flow",
    progress: 100,
  },
  {
    title: "Whisper",
    description: "Anonymous discussion platform for students to share opinions without revealing identity, addressing privacy concerns effectively.",
    period: "Sep 2024 — Ongoing",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveLink: "https://whisper.rushilpatel.dev/",
    codeLink: "https://github.com/rushil-b-patel/Whisper",
    progress: 80,
  },
  {
    title: "ChatGPT Prompt Indexer",
    description: "Indexing and searching through ChatGPT prompts for better organization and accessibility.",
    period: "Sep 2024 — Ongoing",
    techStack: ["JS", "CSS", "HTML"],
    liveLink: null,
    codeLink: "https://github.com/rushil-b-patel/chatGPT-prompt-indexer",
    progress: 80,
  },
];

function ProjectLinks({ liveLink, codeLink }) {
  return (
    <div className="flex items-center gap-2">
      {liveLink && (
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FiExternalLink size={15} />
        </a>
      )}
      {codeLink && (
        <a href={codeLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <FaGithub size={15} />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="Projects" className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="flex flex-col gap-3">
        {projectsList.map((project, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-neutral-950 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300 px-6 py-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                {project.progress < 100 && (
                  <span className="relative flex h-2 w-2 mt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  {project.period}
                </span>
                <ProjectLinks liveLink={project.liveLink} codeLink={project.codeLink} />
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500 shrink-0 ml-4">
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
