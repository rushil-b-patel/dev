import { useState } from 'react';

export default function Experience() {
  const experiences = [
    {
      title: "Software Developer Engineer",
      company: "Odoo",
      startDate: "July 2025",
      endDate: "Present",
      techStack: ["Javascript", "Python", "XML", "SQL", "Jquery", "SCSS"],
      description: [
        "Contributing to the Website team, by improving the Odoo Website Builder module, optimizing page components, templates, and drag-and-drop features to improve user experience",
        "Deepening understanding of web development gaining hands-on experience across both backend and frontend components."
      ]
    },
    {
      title: "Software Developer Intern",
      company: "Odoo",
      startDate: "Jan 2025",
      endDate: "Jun 2025",
      techStack: ["Javascript", "Python", "XML", "SQL", "SCSS"],
      description: [
        "Developed and customized Real Estate module, including end-to-end controllers, views, models, automated actions, and pdf reporting for seamless property, booking, and client management.",
        "Gained hands-on experience with the complete Odoo framework, including ORM, QWeb, XML views, access rights, and server actions, modern OWL framework for frontend development."
      ]
    },
    {
      title: "Frontend Developer Intern",
      company: "Codentic Software",
      startDate: "May 2023",
      endDate: "Jun 2023",
      techStack: ["Next JS", "React JS", "Tailwind", "Bootstrap", "Git"],
      description: [
        "Collaborated with the development team to create dynamic and responsive user interfaces using React JS.",
        "Identified and resolved front-end bugs, ensuring a smooth user experience."
      ]
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(0);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 relative">
      <div className="absolute left-4 md:left-6 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-neutral-800" />
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative flex flex-col md:flex-row items-start mb-8 md:mb-0 pl-12 md:pl-16">
            <div className="absolute -left-2 md:left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-gray-300 dark:border-neutral-600 z-10 mt-1.5" />
            <div className="w-full text-left">
              <div
                className="cursor-pointer group"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {exp.title}
                </h3>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-400 mb-1">
                  {exp.company}
                </div>
                <span className="text-sm font-mono text-gray-500 dark:text-gray-500 block mb-2">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <ul className="list-disc space-y-2 text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed pl-4">
                  {exp.description.map((point, i) => (
                    <li key={i} className="text-left">{point}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 justify-start">
                  {exp.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
