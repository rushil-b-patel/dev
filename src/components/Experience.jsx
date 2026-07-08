"use client";
import { useState } from "react";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

const experiences = [
    { title: "Software Developer Engineer", company: "Odoo", period: "Jul 2025 — Present", current: true, techStack: ["Javascript", "Python", "XML", "PSQL", "jQuery", "SCSS"], description: [
        { text: "Built 15+ production features for Odoo Website Builder." },
        { text: "Built query-param form prefill with multi-form support via unique form-ids.", url: "https://github.com/odoo/odoo/pull/264921" },
        { text: "Integrated Google Maps Places API & AdvancedMarkerElement.", url: "https://github.com/odoo/odoo/pull/242765" },
        { text: "Optimized SEO, templates, static assets & component lifecycles for faster page loads." },
        { text: "Added breadcrumb support in the website editor.", url: "https://github.com/odoo/odoo/pull/224247" },
    ] },
    { title: "Software Developer Intern", company: "Odoo", period: "Jan 2025 — Jun 2025", current: false, techStack: ["Javascript", "Python", "XML", "PSQL", "SCSS"], description: [
        { text: "Built Real Estate module end-to-end - models, views, controllers, actions & PDF reports." },
        { text: "Learned full Odoo stack: ORM, QWeb, XML views, access rights, server actions & OWL." },
    ] },
    { title: "Frontend Developer Intern", company: "Codentic Software", period: "May 2023 — Jun 2023", current: false, techStack: ["Next.js", "React", "Tailwind", "Bootstrap", "Git"], description: [
        { text: "Built dynamic, responsive UIs with React." },
        { text: "Identified and fixed front-end bugs for smoother UX." },
    ] },
];

export default function Experience() {
    const [expanded, setExpanded] = useState(0);
    return (
        <section id="Experience" className="mt-10">
            <h2 className="text-2xl font-bold mb-6">The journey so far</h2>
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
                                                {exp.description.map((point, i) => {
                                                    const item = typeof point === "string" ? { text: point } : point;
                                                    return (
                                                        <li key={i} className="flex gap-2 text-sm text-app-muted leading-relaxed group/item">
                                                            <span className="mt-2.5 w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600 shrink-0" />
                                                            {item.url ? (
                                                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-app-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                                                                    {item.text}
                                                                    <FiExternalLink className="opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" size={12} />
                                                                </a>
                                                            ) : item.text}
                                                        </li>
                                                    );
                                                })}
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
