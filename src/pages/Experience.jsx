import { useState } from 'react';

const experiences = [
    {
      title: "Software Developer Engineer",
      company: "Odoo",
      period: "Jul 2025 — Present",
      current: true,
      techStack: ["Javascript", "Python", "XML", "PSQL", "jQuery", "SCSS"],
      description: [
        "Contributing to the Website team, by improving the Odoo Website Builder module, optimizing page components, templates, and drag-and-drop features to improve user experience.",
        "Deepening understanding of web development gaining hands-on experience across both backend and frontend components.",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "Odoo",
      period: "Jan 2025 — Jun 2025",
      current: false,
      techStack: ["Javascript", "Python", "XML", "PSQL", "SCSS"],
      description: [
        "Developed and customized Real Estate module, including end-to-end controllers, views, models, automated actions, and pdf reporting for seamless property, booking, and client management.",
        "Gained hands-on experience with the complete Odoo framework, including ORM, QWeb, XML views, access rights, and server actions, modern OWL framework for frontend development.",
      ],
    },
    {
      title: "Frontend Developer Intern",
      company: "Codentic Software",
      period: "May 2023 — Jun 2023",
      current: false,
      techStack: ["Next.js", "React", "Tailwind", "Bootstrap", "Git"],
      description: [
        "Collaborated with the development team to create dynamic and responsive user interfaces using React JS.",
        "Identified and resolved front-end bugs, ensuring a smooth user experience.",
      ],
    },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="Experience" className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => {
          const isOpen = expanded === index;
          return (
            <div
              key={index}
              onClick={() => setExpanded(isOpen ? null : index)}
              className={`cursor-pointer rounded-xl border transition-all duration-300
                ${isOpen
                  ? 'bg-gray-50 dark:bg-neutral-900 border-gray-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-950 border-gray-100 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600'}
              `}
            >
              <div className="px-6 py-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-medium text-app-primary">{exp.company}</p>
                  {exp.current && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-app-secondary leading-snug">
                    {exp.title}
                  </h3>
                  <span className="text-xs text-app-muted font-mono shrink-0 ml-4">
                    {exp.period}
                  </span>
                </div>

                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4">
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex gap-2 text-sm text-app-muted leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs font-medium bg-white dark:bg-neutral-800 text-app-secondary rounded-md border border-gray-200 dark:border-neutral-700"
                          >
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
