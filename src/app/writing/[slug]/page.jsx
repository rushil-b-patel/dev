import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAllPosts, extractHeadings } from "@/lib/writing";
import { SITE_NAME, SITE_URL, PERSON_ID, DEFAULT_OG_IMAGE, breadcrumbs } from "@/config/site";
import WritingPostContent from "./WritingPostContent";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    const canonical = `${SITE_URL}/writing/${post.slug}`;
    return {
        title: post.title,
        description: post.description || `${post.title} - ${SITE_NAME}`,
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        alternates: { canonical },
        openGraph: { title: post.title, description: post.description || post.title, url: canonical, type: "article", publishedTime: post.date, modifiedTime: post.updated || post.date, authors: [SITE_NAME] },
        twitter: { card: "summary_large_image", title: post.title, description: post.description || post.title, creator: "@rushil_b_patel" },
    };
}

export default async function WritingPost({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const headings = extractHeadings(post.content);
    const url = `${SITE_URL}/writing/${post.slug}`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "@id": url,
                headline: post.title,
                description: post.description || undefined,
                image: [post.cover ? `${SITE_URL}${post.cover}` : DEFAULT_OG_IMAGE],
                datePublished: post.date,
                dateModified: post.updated || post.date,
                author: { "@type": "Person", "@id": PERSON_ID, name: SITE_NAME, url: SITE_URL },
                publisher: { "@id": PERSON_ID },
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
            },
            breadcrumbs(["Writing", "/writing"], [post.title, `/writing/${post.slug}`]),
        ],
    };
    const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2).map(({ slug, title }) => ({ slug, title }));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <WritingPostContent post={post} headings={headings} more={more} />
        </>
    );
}
