import { getAllPosts } from "@/lib/writing";
import { folders } from "@/lib/frames";
import { SITE_URL } from "@/config/site";

export default function sitemap() {
    const posts = getAllPosts();

    const writingUrls = posts.map((post) => ({
        url: `${SITE_URL}/writing/${post.slug}`,
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
            url: `${SITE_URL}/writing`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/frames`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...folders.map(({ slug }) => ({
            url: `${SITE_URL}/frames/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        })),
        ...writingUrls,
    ];
}
