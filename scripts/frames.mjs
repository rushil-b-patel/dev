import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
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

const folder = process.argv[2];
if (!folder) throw new Error("Usage: npm run frames -- <folder>");

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
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

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const known = new Set(manifest.map((frame) => frame.id));
const out = mkdtempSync(join(tmpdir(), "frames-"));
const added = [];

for (const file of readdirSync(folder).sort()) {
    if (file.startsWith(".")) continue;
    if (!INPUT_TYPES.has(extname(file).toLowerCase())) {
        console.warn(`skip ${file}: unsupported type, export it as JPEG or TIFF`);
        continue;
    }
    const source = readFileSync(join(folder, file));
    const id = createHash("sha256").update(ENCODING).update(source).digest("hex").slice(0, 12);
    if (known.has(id)) continue;
    known.add(id);

    const { autoOrient: { width: w, height: h } } = await sharp(source).metadata();
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
    added.push({ id, w, h, sizes, alt: "", place: "", date: "" });
}

if (added.length) {
    for (const [ext, type] of [["avif", "image/avif"], ["jpg", "image/jpeg"]]) {
        const { status } = spawnSync(
            "rclone",
            ["copy", out, `R2:${R2_BUCKET}`, "-q", "--include", `*.${ext}`, "--header-upload", `Content-Type: ${type}`, "--header-upload", CACHE],
            { env: rcloneEnv, stdio: "inherit" },
        );
        if (status !== 0) throw new Error(`Upload failed for .${ext} files, manifest left unchanged`);
    }
    writeFileSync(MANIFEST, `${JSON.stringify([...manifest, ...added], null, 2)}\n`);
}

rmSync(out, { recursive: true, force: true });
console.log(`${added.length} added. Fill in alt, place and date in ${MANIFEST}, and reorder entries to change the sequence.`);
