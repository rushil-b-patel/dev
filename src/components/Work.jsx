"use client";
import { useState } from "react";
import Pagination from "./Pagination";

const prs = [
    { title: "Breadcrumb support in website editor", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/224247", status: "merged" },
    { title: "Prefill form fields via query params", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/264921", status: "open" },
    { title: "Multi-select dropdown options", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/255671" , status: "open" },
    { title: "Dynamic snippet carousels for blogs, events & appointments", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/238099", status: "open" },
    { title: "Migrate Google Maps to Places API & AdvancedMarkerElement", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/242765", status: "open" },
    { title: "Lazy-load dynamic snippets", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/215388", status: "open" },
    { title: "Refactor WebsiteUrlPicker component", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/226324", status: "open" },
    { title: "Icon List snippet with FontAwesome support", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/225823", status: "open" },
    { title: "Icon inner snippet", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/214112", status: "merged" },
];

const PAGE_SIZE = 5;
const statusLabel = { merged: "merged", open: "open", closed: "closed" };
const statusColor = { merged: "text-purple-500", open: "text-green-500", closed: "text-red-500" };

export default function Work() {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(prs.length / PAGE_SIZE);
    const visible = prs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return (
        <section id="Work" className="mt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">What I&apos;ve been building</h2>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
            <div className="divide-y divide-dashed divide-gray-200 dark:divide-neutral-800">
                {visible.map((pr, index) => (
                    <a key={page * PAGE_SIZE + index} href={pr.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3 transition-all duration-200 hover:pl-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-app-muted text-xs font-mono w-5 shrink-0">{String(page * PAGE_SIZE + index + 1).padStart(2, "0")}</span>
                            <span className="text-sm text-app-primary truncate group-hover:text-app-secondary transition-colors duration-200">{pr.title}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                            <span className={`text-xs font-mono ${statusColor[pr.status]} hidden sm:inline`}>{statusLabel[pr.status]}</span>
                            <span className="text-xs font-mono text-app-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:inline">{pr.repo}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
