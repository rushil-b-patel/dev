"use client";
import { useState } from "react";

const reveal = "opacity-100 translate-x-0 scale-100 pointer-events-auto";

export default function TableOfContents({ headings }) {
    const [open, setOpen] = useState(false);
    if (!headings?.length) return null;

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
            <div className="group flex items-center">
                <div className={`mr-2 max-w-56 transition-[opacity,transform] duration-300 ease-out ${open ? reveal : "opacity-0 translate-x-3 scale-[0.97] pointer-events-none"} group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:scale-100 group-focus-within:pointer-events-auto`}>
                    <div className="bg-white/75 dark:bg-neutral-900/75 backdrop-blur-xl rounded-xl border border-rule px-5 py-4 shadow-lg shadow-black/[0.04] dark:shadow-black/20">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-app-muted mb-3 select-none">Contents</p>
                        <nav aria-label="Table of contents">
                            <ul className="space-y-1.5">
                                {headings.map((h) => (
                                    <li key={h.id}>
                                        <button onClick={() => scrollTo(h.id)} className={`text-[13px] leading-snug text-app-muted hover:text-app-primary transition-colors duration-200 text-left w-full cursor-pointer ${h.level === 3 ? "pl-3 text-[12px]" : ""}`}>{h.text}</button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Table of contents" className="pl-6 pr-5 py-8 cursor-pointer">
                    <div className="w-[3px] h-36 rounded-full bg-(--text-muted) opacity-20 group-hover:opacity-50 transition-opacity duration-300" />
                </button>
            </div>
        </div>
    );
}
