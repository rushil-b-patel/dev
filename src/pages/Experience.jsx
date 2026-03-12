import { useState } from 'react';

export default function Experience() {
  const experiences = [
    {
      title: "Software Developer Engineer",
      company: "Odoo",
      period: "Jul 2025 — Present",
      type: "Full-time",
      current: true,
      techStack: ["Javascript", "Python", "XML", "SQL", "jQuery", "SCSS"],
      description: ["wip"],
    },
    {
      title: "Software Developer Intern",
      company: "Odoo",
      period: "Jan 2025 — Jun 2025",
      type: "Internship",
      current: false,
      techStack: ["Javascript", "Python", "XML", "SQL", "SCSS"],
      description: ["wip"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Codentic Software",
      period: "May 2023 — Jun 2023",
      type: "Internship",
      current: false,
      techStack: ["Next.js", "React", "Tailwind", "Bootstrap", "Git"],
      description: ["wip"],
    },
  ];

  const [expanded, setExpanded] = useState(0);

  return (
    <section id="Experience" className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => {
          const isOpen = expanded === index;
          return (
            <div key={index} onClick={() => setExpanded(isOpen ? null : index)}
              className={`group relative cursor-pointer rounded-xl border transition-all duration-300
                ${isOpen ? 'bg-gray-50 dark:bg-neutral-900 border-gray-900 dark:border-white'
                          : 'bg-white dark:bg-neutral-950 border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600'}
              `}>
              <div className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400">
                      {exp.type}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mt-1.5">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {exp.period}
                    </span>
                    {exp.current ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                      </span>
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-neutral-700" />
                    )}
                  </div>
                </div>

                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4">
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 dark:border-neutral-800">
                        {exp.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs font-medium bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-neutral-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
