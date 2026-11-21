export const SITE_URL = "https://www.rushilpatel.tech";
export const SITE_NAME = "Rushil Patel";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const RESUME_PDF_URL = "/resume.pdf";
export const FRAMES_URL = "https://photos.rushilpatel.tech";
export const JOB_TITLE = "Full Stack Engineer";
export const DEFAULT_TITLE = `${SITE_NAME} | ${JOB_TITLE} at Odoo`;
export const DEFAULT_DESCRIPTION =
    "Rushil Patel is a Full Stack Engineer at Odoo, building its Website Builder. Contributor to odoo/odoo and microsoft/vscode. Writing on UPI, HTTP and APIs.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-banner.jpg`;
const TWITTER = "@rushil_b_patel";

// Next replaces a parent's openGraph/twitter instead of merging. No `path` = no canonical/og:url, which children would inherit.
export function pageMetadata({ title, description, path }) {
    const url = path === undefined ? undefined : `${SITE_URL}${path}`;
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    return {
        ...(title && { title }),
        description,
        ...(url && { alternates: { canonical: url } }),
        openGraph: { title: fullTitle, description, url, siteName: SITE_NAME, images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_TITLE }], type: "website", locale: "en_US" },
        twitter: { card: "summary_large_image", title: fullTitle, description, images: [DEFAULT_OG_IMAGE], creator: TWITTER },
    };
}

export function breadcrumbs(...trail) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: [["Home", ""], ...trail].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path}` })),
    };
}
