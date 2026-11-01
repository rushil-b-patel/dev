import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSheet from "@/components/ContactSheet";
import { SITE_URL } from "@/config/site";
import { folders } from "@/lib/frames";

export function generateStaticParams() {
    return folders.map(({ slug }) => ({ folder: slug }));
}

export async function generateMetadata({ params }) {
    const { folder: slug } = await params;
    const folder = folders.find((item) => item.slug === slug);
    if (!folder) return { title: "Folder not found" };
    return {
        title: `${folder.name} | Frames`,
        description: `Photographs from ${folder.name} by Rushil Patel.`,
        alternates: { canonical: `${SITE_URL}/frames/${folder.slug}` },
    };
}

export default async function FolderPage({ params }) {
    const { folder: slug } = await params;
    const folder = folders.find((item) => item.slug === slug);
    if (!folder) notFound();

    return (
        <>
            <header className="mb-8 flex items-baseline gap-3 text-sm">
                <Link href="/frames" className="link-app">← Frames</Link>
                <h1 className="font-medium text-app-primary">{folder.name}</h1>
                <span className="font-mono text-xs text-app-muted">{folder.frames.length}</span>
            </header>
            <ContactSheet frames={folder.frames} />
        </>
    );
}
