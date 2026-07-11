import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPostBySlug, getAllSlugs, formatPostDate } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post — Rushil Patel";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const fontsDir = path.join(process.cwd(), "src/app/blog/[slug]");
    const [regular, bold] = await Promise.all([
        readFile(path.join(fontsDir, "Geist-Regular.ttf")),
        readFile(path.join(fontsDir, "Geist-Bold.ttf")),
    ]);

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#171717", padding: 72, fontFamily: "Geist" }}>
                <svg width="72" height="72" viewBox="0 0 64 64">
                    <rect width="64" height="64" rx="14" fill="#262626" />
                    <path d="M21 25 V47 M21 34 Q21 25 32 25" fill="none" stroke="#fafafa" strokeWidth="5.5" strokeLinecap="round" />
                    <rect x="37" y="42.5" width="10" height="5" rx="1.5" fill="#3b82f6" />
                </svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 66, fontWeight: 700, color: "#fafafa", lineHeight: 1.15, letterSpacing: "-0.02em", lineClamp: 3 }}>
                        {post?.title ?? "Blog"}
                    </div>
                    <div style={{ width: 64, height: 9, borderRadius: 4.5, backgroundColor: "#3b82f6", marginTop: 34 }} />
                </div>
                <div style={{ display: "flex", fontSize: 27, color: "#a1a1aa" }}>
                    {post ? `rushilpatel.dev · ${formatPostDate(post.date, "long")} · ${post.readingMinutes} min read` : "rushilpatel.dev"}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "Geist", data: regular, weight: 400, style: "normal" },
                { name: "Geist", data: bold, weight: 700, style: "normal" },
            ],
        },
    );
}
