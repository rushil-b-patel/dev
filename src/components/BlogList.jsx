"use client";
import { useState } from "react";
import Link from "next/link";
import { formatPostDate } from "@/lib/blog-utils";
import Pagination from "./Pagination";

const PAGE_SIZE = 3;

export default function BlogList({ posts }) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(posts.length / PAGE_SIZE);
    const visible = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return (
        <section id="Blog" className="mt-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Brain dumps</h2>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
            {posts.length === 0 ? (
                <p className="text-app-muted text-sm">No posts yet.</p>
            ) : (
                <ul className="divide-y divide-dashed divide-gray-200 dark:divide-neutral-800">
                    {visible.map((post) => (
                        <li key={post.slug} className="group">
                            <Link href={`/blog/${post.slug}`} className="block py-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-base font-semibold text-app-primary group-hover:underline underline-offset-2 decoration-gray-400 dark:decoration-neutral-500">{post.title}</h3>
                                    <span className="text-xs text-app-muted tabular-nums shrink-0">{formatPostDate(post.date)} · {post.readingMinutes} min</span>
                                </div>
                                {post.description && <p className="text-sm text-app-muted leading-relaxed mt-1 line-clamp-1">{post.description}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
