import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export default function BlogSection() {
    const posts = getAllPosts();
    return (
        <section id="Blog" className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Blogs</h2>
            {posts.length === 0 ? (
                <p className="text-app-muted text-sm">No posts yet.</p>
            ) : (
                <ul className="divide-y divide-dashed divide-gray-300 dark:divide-neutral-700">
                    {posts.map((post) => (
                        <li key={post.slug} className="group">
                            <Link href={`/blog/${post.slug}`} className="block py-5">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-base font-semibold text-app-primary group-hover:underline underline-offset-2 decoration-gray-400 dark:decoration-neutral-500">{post.title}</h3>
                                    <time dateTime={post.date} className="text-xs text-app-muted tabular-nums shrink-0">{formatPostDate(post.date)}</time>
                                </div>
                                {post.description && <p className="text-sm text-app-muted leading-relaxed mt-2 line-clamp-2">{post.description}</p>}
                                <p className="text-xs text-app-muted mt-3">{post.readingMinutes} min read</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
