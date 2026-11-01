"use client";
import { useEffect, useRef, useState } from "react";
import { FRAMES_URL } from "@/config/site";

const ROW_HEIGHT = "clamp(180px, 22vw, 300px)";

const url = (id, size, ext) => `${FRAMES_URL}/${id}-${size}.${ext}`;
const number = (index) => String(index + 1).padStart(3, "0");
const altFor = (frame, index) => frame.alt || `Frame ${index + 1}`;

function srcSet(frame, ext) {
    const long = Math.max(frame.w, frame.h);
    return frame.sizes.map((size) => `${url(frame.id, size, ext)} ${Math.round((size * frame.w) / long)}w`).join(", ");
}

export default function ContactSheet({ frames }) {
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
                {frames.map((item, i) => {
                    const ratio = item.w / item.h;
                    // Allows for rows stretching up to ~1.5×. Exactly 1.5 tips retina landscapes over 1600px into the 2560 file.
                    const sizes = `min(100vw, calc(${ratio * 1.49} * ${ROW_HEIGHT}))`;
                    return (
                        <li key={item.id} className="min-w-0" style={{ flexGrow: ratio, flexBasis: `calc(${ratio} * ${ROW_HEIGHT})` }}>
                            <button type="button" onClick={() => setIndex(i)} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${altFor(item, i)}`}>
                                <picture className="block">
                                    <source type="image/avif" srcSet={srcSet(item, "avif")} sizes={sizes} />
                                    <img
                                        src={url(item.id, item.sizes[0], "jpg")}
                                        srcSet={srcSet(item, "jpg")}
                                        sizes={sizes}
                                        alt={altFor(item, i)}
                                        width={item.w}
                                        height={item.h}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-auto w-full"
                                    />
                                </picture>
                                <span className="mt-2 flex items-baseline gap-2 font-mono text-xs">
                                    <span className="text-saffron">{number(i)}</span>
                                    {item.place && <span className="truncate text-app-muted">{item.place}</span>}
                                </span>
                            </button>
                        </li>
                    );
                })}
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
                            <span className="min-w-0 flex-1 truncate">{[frame.place, frame.date].filter(Boolean).join(", ")}</span>
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
