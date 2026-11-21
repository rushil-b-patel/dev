import { getAllPosts } from "@/lib/writing";
import { SITE_URL, DEFAULT_DESCRIPTION, RESUME_PDF_URL } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
    const posts = getAllPosts().map((p) => `- [${p.title}](${SITE_URL}/writing/${p.slug}): ${p.description}`);
    const body = [
        "# Rushil Patel",
        "",
        `> ${DEFAULT_DESCRIPTION}`,
        "",
        "## Writing",
        ...posts,
        "",
        "## About",
        `- [Home](${SITE_URL}): experience, open source contributions and projects`,
        `- [Resume](${SITE_URL}${RESUME_PDF_URL})`,
        `- [Frames](${SITE_URL}/frames): photography`,
        "",
    ].join("\n");
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
