// Run: node --test scripts/views.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";

process.env.UPSTASH_REDIS_REST_URL = "https://redis.test";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

const store = new Map();
globalThis.fetch = async (_url, { body }) => {
    const [cmd, key] = JSON.parse(body);
    let result = null;
    if (cmd === "SET" && !store.has(key)) { store.set(key, "1"); result = "OK"; }
    if (cmd === "INCR") { result = Number(store.get(key) ?? 0) + 1; store.set(key, String(result)); }
    if (cmd === "GET") result = store.get(key) ?? null;
    return Response.json({ result });
};

const { POST } = await import("../src/app/api/views/[slug]/route.js");

async function view(slug, headers) {
    const res = await POST(new Request("http://site.test", { method: "POST", headers }), { params: Promise.resolve({ slug }) });
    return res.ok ? (await res.json()).views : res.status;
}

const chrome = { "cf-connecting-ip": "1.1.1.1", "user-agent": "Chrome" };

test("a repeat visit, incognito or not, counts once", async () => {
    assert.equal(await view("rate-limiting", chrome), 1);
    assert.equal(await view("rate-limiting", chrome), 1);
});

test("different visitors each count", async () => {
    assert.equal(await view("rate-limiting", { ...chrome, "cf-connecting-ip": "2.2.2.2" }), 2);
    assert.equal(await view("rate-limiting", { ...chrome, "user-agent": "Safari" }), 3);
});

test("the Cloudflare edge IP does not merge visitors", async () => {
    const edge = { "x-forwarded-for": "172.67.0.1", "user-agent": "Firefox" };
    assert.equal(await view("tracerate", { ...edge, "cf-connecting-ip": "3.3.3.3" }), 1);
    assert.equal(await view("tracerate", { ...edge, "cf-connecting-ip": "4.4.4.4" }), 2);
});

test("each post has its own count", async () => {
    assert.equal(await view("how-upi-works", chrome), 1);
});

test("an unknown slug is rejected and stores nothing", async () => {
    const keys = store.size;
    assert.equal(await view("not-a-post", chrome), 404);
    assert.equal(store.size, keys);
});

test("raw IPs are never stored", () => {
    assert.ok(![...store.keys()].some((k) => k.includes("1.1.1.1")));
});
