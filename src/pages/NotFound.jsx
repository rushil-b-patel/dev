import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SITE_NAME } from "../config/site";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-2xl font-bold text-app-primary mb-3">404</h1>
      <p className="text-app-secondary">
        This page doesn&apos;t exist or the link is broken.
      </p>
      <Link to="/" className="inline-block mt-8 text-sm link-app">
        ← Home
      </Link>
    </>
  );
}
