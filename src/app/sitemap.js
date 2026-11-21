import { getAllPosts } from "@/lib/writing";
import { folders, looseFrames } from "@/lib/frames";
import { SITE_URL, FRAMES_URL } from "@/config/site";

const newest = (dates) => new Date(dates.filter(Boolean).sort().at(-1));
const photo = (frame) => `${FRAMES_URL}/${frame.id}-${frame.sizes.at(-1)}.jpg`;

export default function sitemap() {
    const posts = getAllPosts();
    const postsChanged = newest(posts.map((post) => post.updated || post.date));

    return [
        { url: SITE_URL, lastModified: postsChanged },
        { url: `${SITE_URL}/writing`, lastModified: postsChanged },
        {
            url: `${SITE_URL}/frames`,
            lastModified: newest([...looseFrames, ...folders.map((f) => f.frames[0])].map((f) => f.taken)),
            images: looseFrames.map(photo),
        },
        ...folders.map(({ slug, frames }) => ({ url: `${SITE_URL}/frames/${slug}`, lastModified: newest(frames.map((f) => f.taken)), images: frames.map(photo) })),
        ...posts.map((post) => ({
            url: `${SITE_URL}/writing/${post.slug}`,
            lastModified: new Date(post.updated || post.date),
            images: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
        })),
    ];
}
