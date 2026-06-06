import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const projectsList = [
    { title: "BuildFlow", description: "Scalable architecture with isolated upload and deploy servers for building and deploying applications end-to-end.", techStack: ["Node.js", "Cloudflare", "Redis"], liveLink: null, codeLink: "https://github.com/rushil-b-patel/Build-Flow" },
    { title: "Whisper", description: "Anonymous discussion platform for students to share opinions without revealing identity, addressing privacy concerns effectively.", techStack: ["React", "Node.js", "MongoDB", "Tailwind"], liveLink: "https://whisper.rushilpatel.dev/", codeLink: "https://github.com/rushil-b-patel/Whisper" },
    { title: "ChatGPT Prompt Indexer - Extension", description: "Indexing and searching through ChatGPT prompts for better organization and accessibility.", techStack: ["JavaScript", "CSS", "HTML"], liveLink: null, codeLink: "https://github.com/rushil-b-patel/chatGPT-prompt-indexer" },
    { title: "Tracerate - CLI tool for network diagnostics", description: "Tracerate is a CLI network diagnostic tool that checks download/upload speed, ping, jitter, bufferbloat, regional latency, and IP/DNS info, all in one shot.", techStack: ["Python"], liveLink: "https://pypi.org/project/tracerate", codeLink: "https://github.com/rushil-b-patel/tracerate" },
];

export default function Projects() {
    return (
        <section id="Projects" className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="flex flex-col gap-3">
                {projectsList.map((project, index) => (
                    <div key={index} className="group bg-white dark:bg-neutral-950 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300 px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base font-semibold text-app-primary">{project.title}</h3>
                            <div className="flex items-center gap-3 shrink-0">
                                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="link-app"><FiExternalLink size={15} /></a>}
                                {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="link-app"><FaGithub size={15} /></a>}
                            </div>
                        </div>
                        <p className="text-sm text-app-muted leading-relaxed mt-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {project.techStack.map((tech, idx) => <span key={idx} className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-app-secondary rounded-md border border-gray-200 dark:border-neutral-700">{tech}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
