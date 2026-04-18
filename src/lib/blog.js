import yaml from "js-yaml";

const context = import.meta.glob("../content/blog/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
});

let postsCache = null;

/** @param {string} raw */
function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, content: text };

  let data = {};
  try {
    const loaded = yaml.load(m[1]);
    if (loaded && typeof loaded === "object" && !Array.isArray(loaded)) {
      data = /** @type {Record<string, unknown>} */ (loaded);
    }
  } catch (e) {
    console.warn("[blog] Frontmatter YAML error:", e);
  }
  return { data, content: m[2] };
}

function pathToSlug(filePath) {
  const base = filePath.split("/").pop() ?? "";
  return base.replace(/\.mdx?$/, "");
}

function readingMinutes(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 150));
}

export function textToId(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripMarkdownSyntax(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
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
  if (postsCache) return postsCache;

  const posts = [];

  for (const filePath of Object.keys(context)) {
    const raw = context[filePath];
    if (typeof raw !== "string") continue;

    const { data, content } = parseFrontmatter(raw);
    const slug = data.slug || pathToSlug(filePath);

    if (!data.title || !data.date) {
      console.warn(`[blog] Skipping "${filePath}": missing title or date`);
      continue;
    }

    posts.push({
      slug: String(slug),
      title: String(data.title),
      date: String(data.date),
      description: data.description ? String(data.description) : "",
      content,
      readingMinutes: readingMinutes(content),
    });
  }

  postsCache = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return postsCache;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return getAllPosts().map((p) => p.slug);
}

/** @param {"short" | "long"} [month] */
export function formatPostDate(iso, month = "short") {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month,
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
