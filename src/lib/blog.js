import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { textToId, formatPostDate } from "./blog-utils.js";

export { textToId, formatPostDate };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw) {
    const text = raw.replace(/^\uFEFF/, "");
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) return { data: {}, content: text };
    let data = {};
    try {
        const loaded = yaml.load(m[1]);
        if (loaded && typeof loaded === "object" && !Array.isArray(loaded)) data = loaded;
    } catch {}
    return { data, content: m[2] };
}

function readingMinutes(markdown) {
    const words = markdown.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 150));
}

function stripMarkdownSyntax(text) {
    return text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim();
}

export function extractHeadings(markdown) {
    const headings = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        const level = match[1].length;
        const raw = match[2].trim();
        if (/^agenda\s*:/i.test(raw)) continue;
        const text = stripMarkdownSyntax(raw);
        headings.push({ level, text, id: textToId(text) });
    }
    return headings;
}

export function getAllPosts() {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
        const { data, content } = parseFrontmatter(raw);
        if (!data.title || !data.date) return null;
        const slug = data.slug || file.replace(/\.mdx?$/, "");
        return { slug: String(slug), title: String(data.title), date: String(data.date), description: data.description ? String(data.description) : "", content, readingMinutes: readingMinutes(content) };
    }).filter(Boolean);
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
    return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
    return getAllPosts().map((p) => p.slug);
}
