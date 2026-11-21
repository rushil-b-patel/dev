import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSheet from "@/components/ContactSheet";
import { SITE_URL, PERSON_ID, WEBSITE_ID, pageMetadata, breadcrumbs } from "@/config/site";
import { folders } from "@/lib/frames";
import { getAllPosts } from "@/lib/writing";

export function generateStaticParams() {
    return folders.map(({ slug }) => ({ folder: slug }));
}

export async function generateMetadata({ params }) {
    const { folder: slug } = await params;
    const folder = folders.find((item) => item.slug === slug);
    if (!folder) return { title: "Folder not found" };
    return pageMetadata({ title: `${folder.name} | Frames`, description: `Photographs from ${folder.name} by Rushil Patel.`, path: `/frames/${folder.slug}` });
}

export default async function FolderPage({ params }) {
    const { folder: slug } = await params;
    const folder = folders.find((item) => item.slug === slug);
    if (!folder) notFound();

    const post = getAllPosts().find((p) => p.frames === folder.slug);
    const path = `/frames/${folder.slug}`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "ImageGallery", "@id": `${SITE_URL}${path}`, name: `${folder.name} - Frames`, url: `${SITE_URL}${path}`, author: { "@id": PERSON_ID }, isPartOf: { "@id": WEBSITE_ID } },
            breadcrumbs(["Frames", "/frames"], [folder.name, path]),
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <header className="mb-8 flex flex-wrap items-baseline gap-3 text-sm">
                <Link href="/frames" className="link-app">← Frames</Link>
                <h1 className="font-medium text-app-primary">{folder.name}</h1>
                <span className="font-mono text-xs text-app-muted">{folder.frames.length}</span>
                {post && <Link href={`/writing/${post.slug}`} className="link-app ml-auto">Read: {post.title} →</Link>}
            </header>
            <ContactSheet frames={folder.frames} />
        </>
    );
}
