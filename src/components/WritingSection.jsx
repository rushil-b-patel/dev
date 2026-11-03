import { getAllPosts } from "@/lib/writing";
import WritingList from "./WritingList";

export default function WritingSection() {
    const posts = getAllPosts();
    return <WritingList posts={posts} />;
}
