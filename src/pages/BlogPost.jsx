import { Helmet } from "react-helmet-async";
import rehypeHighlight from "rehype-highlight";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import "highlight.js/styles/github-dark.css";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../config/site";
import {
  formatPostDate,
  getPostBySlug,
  extractHeadings,
  textToId,
} from "../lib/blog";
import TableOfContents from "../components/TableOfContents";

function extractText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node.props) {
    return extractText(node.props.children);
  }
  return "";
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  const headings = useMemo(() => {
    if (!post) return [];
    return extractHeadings(post.content);
  }, [post]);

  const jsonLd = useMemo(() => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || undefined,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        name: SITE_NAME,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${post.slug}`,
      },
    };
  }, [post]);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post not found | {SITE_NAME}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <p className="text-app-secondary">
          This post does not exist or was moved.
        </p>
        <Link to="/#Blog" className="inline-block mt-6 text-sm link-app">
          ← Home
        </Link>
      </>
    );
  }

  const pageTitle = `${post.title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = DEFAULT_OG_IMAGE;

  const components = {
    a: ({ href, children, node, ...rest }) => {
      if (href?.startsWith("/")) {
        return (
          <Link
            to={href}
            className="text-app-muted underline underline-offset-2 hover:text-app-primary"
            {...rest}
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-app-muted underline underline-offset-2 hover:text-app-primary"
          {...rest}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, node, ...rest }) => (
      <img
        src={src}
        alt={alt ?? ""}
        className="rounded-xl border border-gray-200 dark:border-neutral-800 w-full h-auto my-6"
        loading="lazy"
        {...rest}
      />
    ),
    h2: ({ children, node, ...rest }) => {
      const id = textToId(extractText(children));
      return (
        <h2 id={id} {...rest}>
          {children}
        </h2>
      );
    },
    h3: ({ children, node, ...rest }) => {
      const id = textToId(extractText(children));
      return (
        <h3 id={id} {...rest}>
          {children}
        </h3>
      );
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={post.description || `${post.title} — ${SITE_NAME}`}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description || pageTitle}
        />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.description || pageTitle}
        />
        <meta name="twitter:image" content={ogImage} />
        {jsonLd ? (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ) : null}
      </Helmet>

      <TableOfContents headings={headings} />

      <article className="blog-post">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-app-primary leading-snug">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-app-muted">
            <time dateTime={post.date}>
              {formatPostDate(post.date, "long")}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        <div
          className={[
            "prose prose-neutral max-w-none dark:prose-invert",
            "prose-headings:scroll-mt-24 prose-headings:font-semibold",
            "prose-p:leading-relaxed prose-li:leading-relaxed",
            "prose-a:text-app-muted prose-a:no-underline hover:prose-a:underline hover:prose-a:text-app-primary",
            "prose-code:text-app-primary prose-code:before:content-none prose-code:after:content-none",
            "prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0",
            "prose-blockquote:border-app-muted prose-blockquote:text-app-secondary",
          ].join(" ")}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true }]]}
            components={components}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}
