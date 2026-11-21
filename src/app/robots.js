import { SITE_URL } from "@/config/site";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Cloudflare rewrites mailto links to /cdn-cgi/l/email-protection, which 404s for crawlers.
                disallow: ["/api/", "/cdn-cgi/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
