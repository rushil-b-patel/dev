"use client";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import { formatPostDate, textToId } from "@/lib/utils";
import TableOfContents from "@/components/TableOfContents";
import ImageLightbox from "@/components/ImageLightbox";
import QueryDemo from "@/components/QueryDemo";

function extractText(node) {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (typeof node === "object" && node.props) return extractText(node.props.children);
    return "";
}

function Pre({ children, node, ...rest }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(extractText(children).replace(/\n$/, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative">
            <pre {...rest}>{children}</pre>
            <button onClick={copy} aria-label="Copy code" className="absolute top-2.5 right-2.5 rounded-md p-1.5 text-neutral-400 hover:text-neutral-100 bg-neutral-800/70 cursor-pointer transition-colors">
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            </button>
        </div>
    );
}

export default function WritingPostContent({ post, headings }) {
    const [preview, setPreview] = useState(null);
    let imgIndex = post.cover ? 1 : 0;

    const components = {
        a: ({ href, title, children, node, ...rest }) => {
            if (href?.startsWith("/")) return <Link href={href} className="writing-link" {...rest}>{children}</Link>;
            // [term](# "definition") is a tooltip with nothing to click through to.
            const link = href === "#"
                ? <span tabIndex={0} className="cursor-help underline decoration-dotted underline-offset-4">{children}</span>
                : <a href={href} target="_blank" rel="noopener noreferrer" className="writing-link" {...rest}>{children}</a>;
            if (!title) return link;
            return (
                <span className="group lg:relative">
                    {link}
                    <span className="pointer-events-none fixed inset-x-4 bottom-4 z-50 rounded-lg border border-rule bg-surface p-3 text-sm font-normal leading-snug text-app-secondary opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 lg:absolute lg:inset-x-auto lg:bottom-full lg:left-1/2 lg:mb-2 lg:w-max lg:max-w-64 lg:-translate-x-1/2">{title}</span>
                </span>
            );
        },
        p: ({ children, node, ...rest }) => {
            const hasImg = node?.children?.some((c) => c.tagName === "img");
            if (hasImg) return <>{children}</>;
            if (extractText(children).trim() === "[query-demo]") return <QueryDemo />;
            return <p {...rest}>{children}</p>;
        },
        img: ({ src, alt, title, node, ...rest }) => {
            const first = imgIndex++ === 0;
            return (
                <figure className="my-6">
                    <img src={src} alt={alt ?? ""} className="rounded-xl border border-rule w-full h-auto cursor-zoom-in" loading={first ? "eager" : "lazy"} fetchPriority={first ? "high" : undefined} onClick={() => setPreview({ src, alt: alt ?? "" })} {...rest} />
                    {title && <figcaption className="mt-2 text-center text-sm text-app-muted">{title}</figcaption>}
                </figure>
            );
        },
        h2: ({ children, node, ...rest }) => { const id = textToId(extractText(children)); return <h2 id={id} {...rest}>{children}</h2>; },
        h3: ({ children, node, ...rest }) => { const id = textToId(extractText(children)); return <h3 id={id} {...rest}>{children}</h3>; },
        pre: Pre,
    };

    const date = <time dateTime={post.date}>{formatPostDate(post.date, "long")}</time>;
    const readTime = <span>{post.readingMinutes} min read</span>;

    return (
        <>
            <TableOfContents headings={headings} />
            <ImageLightbox image={preview} onClose={() => setPreview(null)} />
            <article className="writing-post font-geist">
                <header className="mb-10">
                    {post.cover && (
                        <figure className="mb-8 cursor-zoom-in bg-surface p-[2%] pb-0 shadow-sm ring-1 ring-rule" onClick={() => setPreview({ src: post.cover, alt: "" })}>
                            <img src={post.cover} alt="" width={1200} height={675} fetchPriority="high" className="w-full h-auto" />
                            <figcaption className="flex flex-wrap items-center justify-between gap-x-3 py-2 text-sm text-app-muted">{date}{readTime}</figcaption>
                        </figure>
                    )}
                    <h1 className="text-2xl md:text-3xl font-bold text-app-primary leading-snug">{post.title}</h1>
                    {!post.cover && <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-app-muted">{date}<span aria-hidden>·</span>{readTime}</div>}
                </header>
                <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:leading-relaxed prose-li:leading-relaxed prose-code:text-app-primary prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-blockquote:border-app-muted prose-blockquote:text-app-secondary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeHighlight, { detect: true }]]} components={components}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </>
    );
}
