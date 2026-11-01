import manifest from "../../content/frames.json";
import { textToId } from "./utils";

// Newest first. This also orders folders by their newest photo and makes it the cover.
const frames = [...manifest].sort((a, b) => b.taken.localeCompare(a.taken));

export const looseFrames = frames.filter((frame) => !frame.folder);

const bySlug = new Map();
for (const frame of frames) {
    if (!frame.folder) continue;
    const slug = textToId(frame.folder);
    if (!bySlug.has(slug)) bySlug.set(slug, { slug, name: frame.folder, frames: [] });
    bySlug.get(slug).frames.push(frame);
}

export const folders = [...bySlug.values()];
