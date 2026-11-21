import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/writing";
import { SITE_URL, PERSON_ID, WEBSITE_ID, pageMetadata, breadcrumbs } from "@/config/site";

export const metadata = pageMetadata({
    title: "Writing",
    description: "Writing by Rushil Patel on payments (UPI), HTTP, APIs, rate limiting and networking, plus the odd travel story.",
    path: "/writing",
});

export default function WritingIndex() {
    const posts = getAllPosts();
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Blog",
                "@id": `${SITE_URL}/writing#blog`,
                url: `${SITE_URL}/writing`,
                name: "Writing - Rushil Patel",
                isPartOf: { "@id": WEBSITE_ID },
                author: { "@id": PERSON_ID },
                blogPost: posts.map((post) => ({ "@type": "BlogPosting", "@id": `${SITE_URL}/writing/${post.slug}`, headline: post.title, datePublished: post.date })),
            },
            breadcrumbs(["Writing", "/writing"]),
        ],
    };
    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h1 className="text-2xl font-bold text-app-primary mb-2">Writing</h1>
            <p className="text-sm text-app-muted mb-10 max-w-lg">Notes on building software, infrastructure, and things I learn along the way.</p>
            {posts.length === 0 ? (
                <p className="text-app-muted text-sm">No posts yet.</p>
            ) : (
                <ul className="divide-y divide-dashed divide-rule">
                    {posts.map((post) => (
                        <li key={post.slug} className="group">
                            <Link href={`/writing/${post.slug}`} className="block py-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h2 className="text-base font-semibold text-app-primary underline-offset-2 group-hover:underline">{post.title}</h2>
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
