import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, extractHeadings } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/config/site";
import BlogPostContent from "./BlogPostContent";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    return {
        title: post.title,
        description: post.description || `${post.title} — ${SITE_NAME}`,
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        alternates: { canonical },
        openGraph: { title: post.title, description: post.description || post.title, url: canonical, type: "article", publishedTime: post.date, authors: [SITE_NAME] },
        twitter: { card: "summary_large_image", title: post.title, description: post.description || post.title, creator: "@rushil_b_patel" },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const headings = extractHeadings(post.content);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description || undefined,
        datePublished: post.date,
        author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Person", name: SITE_NAME },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BlogPostContent post={post} headings={headings} />
        </>
    );
}
