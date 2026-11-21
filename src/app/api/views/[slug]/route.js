import { createHmac } from "node:crypto";
// Relative, not "@/": scripts/views.test.mjs imports this file under plain node.
import { getAllSlugs } from "../../../../lib/writing.js";

const ONE_DAY = 60 * 60 * 24;

async function redis(...command) {
    const res = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        body: JSON.stringify(command),
    });
    if (!res.ok) throw new Error(`Redis responded ${res.status}`);
    return (await res.json()).result;
}

export async function POST(request, { params }) {
    const { slug } = await params;
    if (!getAllSlugs().includes(slug)) return new Response(null, { status: 404 });

    // Cloudflare proxies the site, so x-forwarded-for alone would be its edge IP.
    const { headers } = request;
    const ip = headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for") ?? "";
    const visitor = createHmac("sha256", process.env.UPSTASH_REDIS_REST_TOKEN)
        .update(`${ip}|${headers.get("user-agent")}`)
        .digest("hex");

    const isNew = await redis("SET", `seen:${slug}:${visitor}`, "1", "NX", "EX", ONE_DAY);
    const views = await redis(isNew ? "INCR" : "GET", `views:${slug}`);
    return Response.json({ views: Number(views) });
}
