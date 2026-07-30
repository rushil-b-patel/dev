"use client";
import { useState } from "react";
import Pagination from "./Pagination";

const PAGE_SIZE = 5;

export default function Work({ prs }) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(prs.length / PAGE_SIZE);
    const visible = prs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return (
        <section id="Work" className="mt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">What I&apos;ve been building</h2>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
            <div className="divide-y divide-dashed divide-rule">
                {visible.map((pr, index) => (
                    <a key={page * PAGE_SIZE + index} href={pr.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4 transition-transform duration-200 hover:translate-x-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-app-muted text-xs font-mono w-5 shrink-0">{String(page * PAGE_SIZE + index + 1).padStart(2, "0")}</span>
                            <span className="text-sm text-app-primary truncate group-hover:text-app-secondary transition-colors duration-200">{pr.title}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                            <span className="text-xs font-mono text-app-muted hidden md:inline">{pr.repo}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
