import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "../config/site";
import { formatPostDate, getAllPosts } from "../lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();
  const title = `Blog | ${SITE_NAME}`;
  const description = "Articles on web development, systems, and engineering.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold text-app-primary mb-2">Blogs</h1>
        <p className="text-sm text-app-muted mb-10 max-w-lg">
          Notes on building software, infrastructure, and things I learn along the way.
        </p>

        {posts.length === 0 ? (
          <p className="text-app-muted text-sm">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-gray-100 bg-white px-6 py-4 transition-all duration-300 hover:border-gray-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-app-primary underline-offset-2 group-hover:underline decoration-gray-400 dark:decoration-neutral-500">
                      {post.title}
                    </h2>
                    <time
                      dateTime={post.date}
                      className="shrink-0 text-xs tabular-nums text-app-muted"
                    >
                      {formatPostDate(post.date)}
                    </time>
                  </div>
                  {post.description ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-app-muted">
                      {post.description}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs text-app-muted">
                    {post.readingMinutes} min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
