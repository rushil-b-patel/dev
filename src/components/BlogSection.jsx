import { getAllPosts } from "@/lib/blog";
import BlogList from "./BlogList";

export default function BlogSection() {
    const posts = getAllPosts();
    return <BlogList posts={posts} />;
}
