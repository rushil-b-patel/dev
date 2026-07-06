"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import { formatPostDate, textToId } from "@/lib/blog-utils";
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

export default function BlogPostContent({ post, headings }) {
    const [preview, setPreview] = useState(null);

    const components = {
        a: ({ href, children, node, ...rest }) => {
            if (href?.startsWith("/")) return <Link href={href} className="blog-link" {...rest}>{children}</Link>;
            return <a href={href} target="_blank" rel="noopener noreferrer" className="blog-link" {...rest}>{children}</a>;
        },
        p: ({ children, node, ...rest }) => {
            const hasImg = node?.children?.some((c) => c.tagName === "img");
            if (hasImg) return <>{children}</>;
            if (extractText(children).trim() === "[query-demo]") return <QueryDemo />;
            return <p {...rest}>{children}</p>;
        },
        img: ({ src, alt, title, node, ...rest }) => (
            <figure className="my-6">
                <img src={src} alt={alt ?? ""} className="rounded-xl border border-gray-200 dark:border-neutral-800 w-full h-auto cursor-zoom-in" loading="lazy" onClick={() => setPreview({ src, alt: alt ?? "" })} {...rest} />
                {title && <figcaption className="mt-2 text-center text-sm text-app-muted">{title}</figcaption>}
            </figure>
        ),
        h2: ({ children, node, ...rest }) => { const id = textToId(extractText(children)); return <h2 id={id} {...rest}>{children}</h2>; },
        h3: ({ children, node, ...rest }) => { const id = textToId(extractText(children)); return <h3 id={id} {...rest}>{children}</h3>; },
    };

    return (
        <>
            <TableOfContents headings={headings} />
            <ImageLightbox image={preview} onClose={() => setPreview(null)} />
            <article className="blog-post font-geist">
                <header className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-app-primary leading-snug">{post.title}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-app-muted">
                        <time dateTime={post.date}>{formatPostDate(post.date, "long")}</time>
                        <span aria-hidden>·</span>
                        <span>{post.readingMinutes} min read</span>
                    </div>
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
