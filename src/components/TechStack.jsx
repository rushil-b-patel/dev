import { FaJs, FaPython, FaNodeJs, FaGitAlt, FaDocker, FaLinux, FaJava, FaAws, FaCloudflare } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql } from "react-icons/si";

export default function TechStack() {
  const technologies = [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    { name: "Python", icon: <FaPython className="text-blue-500" /> },
    { name: "Java", icon: <FaJava className="text-yellow-400" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "Next JS", icon: <SiNextdotjs className="text-black dark:text-white" /> },
    { name: "Node JS", icon: <FaNodeJs className="text-green-500" /> },
    { name: "AWS", icon: <FaAws className="text-blue-500" /> },
    { name: "CloudFlare", icon: <FaCloudflare className="text-blue-500" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "Linux", icon: <FaLinux className="text-black dark:text-white" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  ];

  return (
    <section id="tech-stack" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 min-w-[100px] bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
