import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiBookOpen } from "react-icons/fi";

const projectsList = [
    { title: "BuildFlow", description: "Scalable architecture with isolated upload and deploy servers for building and deploying applications end-to-end.", techStack: ["Node.js", "Cloudflare", "Redis"], liveLink: "https://buildflow.rushilpatel.dev", codeLink: "https://github.com/rushil-b-patel/Build-Flow" },
    { title: "Tracerate", description: "CLI network diagnostic tool that checks download/upload speed, ping, jitter, bufferbloat, regional latency, and IP/DNS info, all in one shot.", techStack: ["Python", "Pytest"], liveLink: "https://pypi.org/project/tracerate", codeLink: "https://github.com/rushil-b-patel/tracerate", blogLink: "/blog/tracerate" },
    { title: "Whisper", description: "Anonymous discussion platform for students to share opinions without revealing identity, addressing privacy concerns effectively.", techStack: ["React", "Node.js", "MongoDB", "Tailwind"], liveLink: "https://whisper.rushilpatel.dev/", codeLink: "https://github.com/rushil-b-patel/Whisper" },
    { title: "ChatGPT Prompt Indexer", description: "Browser extension for indexing and searching through ChatGPT prompts for better organization and accessibility.", techStack: ["JavaScript", "CSS", "HTML"], liveLink: null, codeLink: "https://github.com/rushil-b-patel/chatGPT-prompt-indexer" },
];

export default function Projects() {
    return (
        <section id="Projects" className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="divide-y divide-dashed divide-gray-300 dark:divide-neutral-700">
                {projectsList.map((project, index) => (
                    <div key={index} className="py-4">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="text-base font-semibold text-app-primary">{project.title}</h3>
                            <div className="flex items-center gap-3 shrink-0 text-app-muted">
                                {project.blogLink && <Link href={project.blogLink} className="link-app" title="Read the blog" aria-label={`Read the ${project.title} blog`}><FiBookOpen size={15} /></Link>}
                                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="link-app" aria-label={`${project.title} live`}><FiExternalLink size={15} /></a>}
                                {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="link-app" aria-label={`${project.title} source`}><FaGithub size={15} /></a>}
                            </div>
                        </div>
                        <p className="text-sm text-app-muted leading-relaxed mt-1">{project.description}</p>
                        <p className="text-xs text-app-muted font-mono mt-2">{project.techStack.join(" · ")}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
