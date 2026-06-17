"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const experiences = [
    { title: "Software Developer Engineer", company: "Odoo", period: "Jul 2025 — Present", current: true, techStack: ["Javascript", "Python", "XML", "PSQL", "jQuery", "SCSS"], description: ["Developed and maintained 15+ production-grade features in Odoo ERP using Python, Odoo ORM, and JavaScript, supporting modular and scalable business workflows.", "Optimized site architecture, SEO, template structure, static assets, and component lifecycles to reduce page load times and improve runtime performance.", "Integrated third-party services and frontend APIs including Google Maps (Places, AdvancedMarkerElement) for location-based features.", "Added a feature allowing forms to prefill data via query params, with multiple forms on a single page using a unique form-id in the website builder, along with the documentation."] },
    { title: "Software Developer Intern", company: "Odoo", period: "Jan 2025 — Jun 2025", current: false, techStack: ["Javascript", "Python", "XML", "PSQL", "SCSS"], description: ["Developed and customized Real Estate module, including end-to-end controllers, views, models, automated actions, and pdf reporting for seamless property, booking, and client management.", "Gained hands-on experience with the complete Odoo framework, including ORM, QWeb, XML views, access rights, and server actions, modern OWL framework for frontend development."] },
    { title: "Frontend Developer Intern", company: "Codentic Software", period: "May 2023 — Jun 2023", current: false, techStack: ["Next.js", "React", "Tailwind", "Bootstrap", "Git"], description: ["Collaborated with the development team to create dynamic and responsive user interfaces using React JS.", "Identified and resolved front-end bugs, ensuring a smooth user experience."] },
];

export default function Experience() {
    const [expanded, setExpanded] = useState(0);
    return (
        <section id="Experience" className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="divide-y divide-dashed divide-gray-300 dark:divide-neutral-700">
                {experiences.map((exp, index) => {
                    const isOpen = expanded === index;
                    return (
                        <div key={index}>
                            <button onClick={() => setExpanded(isOpen ? null : index)} className="w-full text-left cursor-pointer py-5">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className="font-medium text-app-primary">{exp.company}</p>
                                    {exp.current && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" /></span>}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                    <h3 className="text-base font-semibold text-app-secondary leading-snug">{exp.title}</h3>
                                    <div className="flex items-center gap-2 shrink-0 sm:ml-4">
                                        <span className="text-xs text-app-muted font-mono">{exp.period}</span>
                                        <FiChevronDown className={`text-app-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={14} />
                                    </div>
                                </div>
                                <div className="grid transition-all duration-500 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                                    <div className="overflow-hidden">
                                        <div className="mt-4">
                                            <ul className="space-y-2 mb-4">
                                                {exp.description.map((point, i) => <li key={i} className="flex gap-2 text-sm text-app-muted leading-relaxed"><span className="mt-2.5 w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600 shrink-0" />{point}</li>)}
                                            </ul>
                                            <div className="flex flex-wrap gap-1.5">
                                                {exp.techStack.map((tech, idx) => <span key={idx} className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-app-secondary rounded-md border border-gray-200 dark:border-neutral-700">{tech}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
