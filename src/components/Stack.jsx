import { useState } from "react";
import { FaJs, FaPython, FaNodeJs, FaGitAlt, FaDocker, FaLinux, FaJava, FaAws, FaCloudflare } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiRedis, SiShadcnui } from "react-icons/si";

const technologies = [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Python", icon: <FaPython className="text-blue-400" /> },
    { name: "Java", icon: <FaJava className="text-orange-500" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-app-primary" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "AWS", icon: <FaAws className="text-orange-400" /> },
    { name: "Cloudflare", icon: <FaCloudflare className="text-orange-400" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Linux", icon: <FaLinux className="text-app-primary" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
    { name: "Redis", icon: <SiRedis className="text-red-500" /> },
    { name: "shadcn/ui", icon: <SiShadcnui className="text-app-primary" /> },
];

export default function Stack() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="Stack" className="mt-10">
      <h2 className="text-2xl font-bold">Stack</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-neutral-800 cursor-default transition-all duration-200 ease-out hover:bg-gray-200 dark:hover:bg-neutral-700 hover:-translate-y-1 hover:shadow-sm"
          >
            <div
              className="text-xl transition-transform duration-200 ease-out"
              style={{ transform: hovered === index ? "scale(1.2)" : "scale(1)" }}
            >
              {tech.icon}
            </div>

            <div
              className="absolute -top-7 left-1/2 pointer-events-none"
              style={{
                transform: hovered === index
                  ? "translateX(-50%) translateY(0px)"
                  : "translateX(-50%) translateY(4px)",
                opacity: hovered === index ? 1 : 0,
                transition: "opacity 150ms ease, transform 150ms ease",
              }}
            >
              <span className="block px-2 py-0.5 text-xs font-medium whitespace-nowrap rounded-md bg-gray-900 dark:bg-white text-app-inverse">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
