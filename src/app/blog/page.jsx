import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/config/site";

export const metadata = {
    title: "Blog",
    description: "Articles on web development, systems, and engineering.",
    alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
    const posts = getAllPosts();
    return (
        <div>
            <h1 className="text-2xl font-bold text-app-primary mb-2">Blogs</h1>
            <p className="text-sm text-app-muted mb-10 max-w-lg">Notes on building software, infrastructure, and things I learn along the way.</p>
            {posts.length === 0 ? (
                <p className="text-app-muted text-sm">No posts yet.</p>
            ) : (
                <ul className="divide-y divide-dashed divide-gray-300 dark:divide-neutral-700">
                    {posts.map((post) => (
                        <li key={post.slug} className="group">
                            <Link href={`/blog/${post.slug}`} className="block py-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h2 className="text-base font-semibold text-app-primary underline-offset-2 group-hover:underline decoration-gray-400 dark:decoration-neutral-500">{post.title}</h2>
                                    <span className="shrink-0 text-xs tabular-nums text-app-muted">{formatPostDate(post.date)} · {post.readingMinutes} min</span>
                                </div>
                                {post.description && <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-app-muted">{post.description}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
