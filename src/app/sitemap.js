import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/config/site";

export default function sitemap() {
    const posts = getAllPosts();

    const blogUrls = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...blogUrls,
    ];
}
