import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPostBySlug, getAllSlugs } from "@/lib/writing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Writing - Rushil Patel";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const [bold, cover] = await Promise.all([
        readFile(path.join(process.cwd(), "src/app/writing/[slug]/Geist-Bold.ttf")),
        post?.cover ? readFile(path.join(process.cwd(), "public", post.cover)) : null,
    ]);

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", backgroundColor: "#171717", fontFamily: "Geist" }}>
                {cover && <img src={Uint8Array.from(cover).buffer} alt="" style={{ position: "absolute", top: 0, left: 0, width: size.width, height: size.height, objectFit: "cover" }} />}
                <div style={{ display: "block", width: "100%", padding: "120px 240px 56px 64px", backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.9))", fontSize: 64, fontWeight: 700, color: "#fff", lineHeight: 1.15, textWrap: "balance", lineClamp: 3 }}>
                    {post?.title ?? "Writing"}
                </div>
            </div>
        ),
        { ...size, fonts: [{ name: "Geist", data: bold, weight: 700, style: "normal" }] },
    );
}
