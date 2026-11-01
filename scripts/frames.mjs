import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import sharp from "sharp";

const MANIFEST = "content/frames.json";
const LONG_EDGES = [800, 1600, 2560, 3840];
const INPUT_TYPES = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);
const CACHE = "Cache-Control: public, max-age=31536000, immutable";
const AVIF = { quality: 90, effort: 6, chromaSubsampling: "4:4:4" };
const JPEG = { quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" };
// Part of each photo's ID: cached URLs are immutable, so new settings need new URLs.
const ENCODING = JSON.stringify([LONG_EDGES, AVIF, JPEG]);

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_INBOX = R2_BUCKET } = process.env;
const accountId = R2_ACCOUNT_ID?.match(/[a-f0-9]{32}/)?.[0];
if (!accountId || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) throw new Error("Missing R2_* values in .env");

const rcloneEnv = {
    ...process.env,
    RCLONE_CONFIG_R2_TYPE: "s3",
    RCLONE_CONFIG_R2_PROVIDER: "Cloudflare",
    RCLONE_CONFIG_R2_ACCESS_KEY_ID: R2_ACCESS_KEY_ID,
    RCLONE_CONFIG_R2_SECRET_ACCESS_KEY: R2_SECRET_ACCESS_KEY,
    RCLONE_CONFIG_R2_ENDPOINT: `https://${accountId}.r2.cloudflarestorage.com`,
    RCLONE_CONFIG_R2_NO_CHECK_BUCKET: "true",
};

const rclone = (...args) => {
    const { status } = spawnSync("rclone", [...args, "-q"], { env: rcloneEnv, stdio: "inherit" });
    if (status !== 0) throw new Error(`rclone ${args[0]} failed, ${MANIFEST} left unchanged`);
};

const frames = new Map(JSON.parse(readFileSync(MANIFEST, "utf8")).map((frame) => [frame.id, frame]));
const work = mkdtempSync(join(tmpdir(), "frames-"));
process.on("exit", () => rmSync(work, { recursive: true, force: true }));
const out = join(work, "out");
mkdirSync(out);
let added = 0;

let root = process.argv[2];
if (!root) {
    root = join(work, "raw");
    mkdirSync(root);
    // Skips files this script published, which are named <12 hex>-<size>.<ext>.
    rclone("copy", `R2:${R2_INBOX}`, root, "--exclude", "/{{[a-f0-9]{12}-[0-9]+\\.(avif|jpg)}}");
}

// EXIF stores dates as "YYYY:MM:DD HH:MM:SS". The earliest is the capture time; later ones are edits.
function takenAt(exif) {
    const [first] = exif?.toString("latin1").match(/(?:19|20)\d\d:\d\d:\d\d \d\d:\d\d:\d\d/g)?.sort() ?? [];
    return first?.replace(/^(\d{4}):(\d{2}):(\d{2}) /, "$1-$2-$3T") ?? "";
}

const list = (dir) => readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name));

// Files directly in the root stay loose. Each subfolder becomes a group.
const sources = list(root).flatMap((entry) => (entry.isDirectory()
    ? list(join(root, entry.name)).map((item) => ({ item, folder: entry.name }))
    : [{ item: entry, folder: "" }]));

for (const { item, folder } of sources) {
    const file = item.name;
    if (!item.isFile() || !INPUT_TYPES.has(extname(file).toLowerCase())) {
        console.warn(`skip ${file}: not a JPEG, PNG, TIFF or WebP file`);
        continue;
    }
    if (folder && !/\w/.test(folder)) throw new Error(`Folder "${folder}" needs a Latin letter or digit for its URL`);

    const source = readFileSync(join(item.parentPath, file));
    const id = createHash("sha256").update(ENCODING).update(source).digest("hex").slice(0, 12);
    const known = frames.get(id);
    if (known) {
        if (folder) known.folder = folder;
        continue;
    }

    const { exif: sourceExif, autoOrient: { width: w, height: h } } = await sharp(source).metadata();
    const long = Math.max(w, h);
    const sizes = [...new Set([...LONG_EDGES.filter((edge) => edge < long), Math.min(long, LONG_EDGES.at(-1))])];

    console.log(`${file} → ${id} (${w}×${h})`);
    for (const size of sizes) {
        const base = sharp(source).autoOrient().resize({ width: size, height: size, fit: "inside" }).keepIccProfile();
        const avif = join(out, `${id}-${size}.avif`);
        const jpeg = join(out, `${id}-${size}.jpg`);
        await base.clone().avif(AVIF).toFile(avif);
        await base.clone().jpeg(JPEG).toFile(jpeg);

        for (const path of [avif, jpeg]) {
            const { exif, xmp, iptc } = await sharp(path).metadata();
            if (exif || xmp || iptc) throw new Error(`${path} still has metadata, aborting before upload`);
        }
    }
    frames.set(id, { id, folder, w, h, sizes, taken: takenAt(sourceExif), alt: "", place: "" });
    added++;
}

if (added) {
    for (const [ext, type] of [["avif", "image/avif"], ["jpg", "image/jpeg"]]) {
        rclone("copy", out, `R2:${R2_BUCKET}`, "--include", `*.${ext}`, "--header-upload", `Content-Type: ${type}`, "--header-upload", CACHE);
    }
}

writeFileSync(MANIFEST, `${JSON.stringify([...frames.values()], null, 2)}\n`);
console.log(`${added} added. Fill in alt and place in ${MANIFEST}.`);
