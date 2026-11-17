import { SITE_URL } from "@/config/site";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // /cdn-cgi/: Cloudflare rewrites the mailto link to /cdn-cgi/l/email-protection, which 404s for crawlers.
                // /_next/ stays crawlable: Google needs its JS, CSS and images to render pages.
                disallow: ["/api/", "/cdn-cgi/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
