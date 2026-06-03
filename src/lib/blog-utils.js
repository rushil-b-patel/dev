export function textToId(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
}

export function formatPostDate(iso, month = "short") {
    try {
        return new Intl.DateTimeFormat("en", { year: "numeric", month, day: "numeric" }).format(new Date(iso));
    } catch { return iso; }
}
