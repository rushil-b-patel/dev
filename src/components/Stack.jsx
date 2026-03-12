import { FaJs, FaPython, FaNodeJs, FaGitAlt, FaDocker, FaLinux, FaJava, FaAws, FaCloudflare } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiRedis, SiShadcnui } from "react-icons/si";

export default function Stack() {
  const technologies = [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Python", icon: <FaPython className="text-blue-400" /> },
    { name: "Java", icon: <FaJava className="text-orange-500" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "AWS", icon: <FaAws className="text-orange-400" /> },
    { name: "Cloudflare", icon: <FaCloudflare className="text-orange-400" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Linux", icon: <FaLinux className="text-black dark:text-white" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
    { name: "Redis", icon: <SiRedis className="text-red-500" /> },
    { name: "shadcnUI", icon: <SiShadcnui className="text-black dark:text-white" /> },
  ];

  return (
    <section id="Stack" className="mt-10">
      <h2 className="text-2xl font-bold">Stack</h2>
      <div className="flex flex-wrap gap-3 mt-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            title={tech.name}
            className="relative group flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="text-xl">{tech.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
