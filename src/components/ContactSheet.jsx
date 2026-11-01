"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FRAMES_URL } from "@/config/site";

const ROW_HEIGHT = "clamp(180px, 22vw, 300px)";
const STACKED_PRINTS = "shadow-[5px_-5px_0_-1px_var(--background-color),5px_-5px_0_0_var(--text-muted),10px_-10px_0_-1px_var(--background-color),10px_-10px_0_0_var(--text-muted)]";

const url = (id, size, ext) => `${FRAMES_URL}/${id}-${size}.${ext}`;
const number = (index) => String(index + 1).padStart(3, "0");
const altFor = (frame, index) => frame.alt || `Frame ${index + 1}`;
const monthYear = (taken) => taken && new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(taken));

function srcSet(frame, ext) {
    const long = Math.max(frame.w, frame.h);
    return frame.sizes.map((size) => `${url(frame.id, size, ext)} ${Math.round((size * frame.w) / long)}w`).join(", ");
}

function rowItemStyle(frame) {
    const ratio = frame.w / frame.h;
    return { flexGrow: ratio, flexBasis: `calc(${ratio} * ${ROW_HEIGHT})` };
}

function Thumbnail({ frame, alt, className = "" }) {
    // Allows for rows stretching up to ~1.5×. Exactly 1.5 tips retina landscapes over 1600px into the 2560 file.
    const sizes = `min(100vw, calc(${(frame.w / frame.h) * 1.49} * ${ROW_HEIGHT}))`;
    return (
        <picture className={`block ${className}`}>
            <source type="image/avif" srcSet={srcSet(frame, "avif")} sizes={sizes} />
            <img
                src={url(frame.id, frame.sizes[0], "jpg")}
                srcSet={srcSet(frame, "jpg")}
                sizes={sizes}
                alt={alt}
                width={frame.w}
                height={frame.h}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
            />
        </picture>
    );
}

export default function ContactSheet({ frames, folders = [] }) {
    const [index, setIndex] = useState(null);
    const dialog = useRef(null);
    const isOpen = index !== null;
    const frame = isOpen ? frames[index] : null;
    const viewerSizes = frame && `min(100vw, ${(100 * frame.w) / frame.h}vh)`;

    useEffect(() => {
        if (!isOpen) return;
        dialog.current.showModal();
        // Otherwise showModal focuses the ← button and arrow keys highlight it.
        dialog.current.focus();
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const step = (by) => setIndex((current) => (current + by + frames.length) % frames.length);

    return (
        <>
            {/* Justified rows: each photo grows by its aspect ratio. The ::after spacer keeps the last row from stretching. */}
            <ul className="flex flex-wrap gap-x-4 gap-y-8 after:grow-[9999] lg:gap-x-6">
                {folders.map((folder) => (
                    <li key={folder.slug} className="min-w-0" style={rowItemStyle(folder.cover)}>
                        <Link href={`/frames/${folder.slug}`} className="block" aria-label={`Open ${folder.name}, ${folder.count} photos`}>
                            <Thumbnail frame={folder.cover} alt="" className={STACKED_PRINTS} />
                            <span className="mt-2 flex items-baseline gap-2 font-mono text-xs">
                                <span className="truncate text-app-primary">{folder.name}</span>
                                <span className="text-app-muted">{folder.count}</span>
                            </span>
                        </Link>
                    </li>
                ))}
                {frames.map((item, i) => (
                    <li key={item.id} className="min-w-0" style={rowItemStyle(item)}>
                        <button type="button" onClick={() => setIndex(i)} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${altFor(item, i)}`}>
                            <Thumbnail frame={item} alt={altFor(item, i)} />
                            <span className="mt-2 flex items-baseline gap-2 font-mono text-xs">
                                <span className="text-saffron">{number(i)}</span>
                                {item.place && <span className="truncate text-app-muted">{item.place}</span>}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            <dialog
                ref={dialog}
                tabIndex={-1}
                onClose={() => setIndex(null)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") step(-1);
                    if (e.key === "ArrowRight") step(1);
                }}
                className="m-0 h-dvh max-h-none w-full max-w-none bg-[#111] p-0 text-neutral-400 outline-none!"
                aria-label="Photo viewer"
            >
                {frame && (
                    <div className="flex h-full flex-col">
                        <div className="min-h-0 flex-1 p-2 sm:p-6">
                            <picture key={frame.id} className="flex h-full w-full items-center justify-center">
                                <source type="image/avif" srcSet={srcSet(frame, "avif")} sizes={viewerSizes} />
                                <img
                                    src={url(frame.id, frame.sizes.at(-1), "jpg")}
                                    srcSet={srcSet(frame, "jpg")}
                                    sizes={viewerSizes}
                                    alt={altFor(frame, index)}
                                    width={frame.w}
                                    height={frame.h}
                                    style={{ maxWidth: frame.w, maxHeight: frame.h }}
                                    className="h-full w-full object-contain"
                                />
                            </picture>
                        </div>
                        <div className="flex items-center gap-3 px-3 pb-2 font-mono text-xs sm:px-6">
                            <span className="shrink-0 text-neutral-200">{number(index)} / {number(frames.length - 1)}</span>
                            <span className="min-w-0 flex-1 truncate">{[frame.place, monthYear(frame.taken)].filter(Boolean).join(", ")}</span>
                            <button type="button" onClick={() => step(-1)} className="p-3 hover:text-white" aria-label="Previous photo">←</button>
                            <button type="button" onClick={() => step(1)} className="p-3 hover:text-white" aria-label="Next photo">→</button>
                            <button type="button" onClick={() => dialog.current.close()} className="p-3 hover:text-white">Close</button>
                        </div>
                    </div>
                )}
            </dialog>
        </>
    );
}
