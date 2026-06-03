import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
    return (
        <>
            <h1 className="text-2xl font-bold text-app-primary mb-3">404</h1>
            <p className="text-app-secondary">This page doesn&apos;t exist or the link is broken.</p>
            <Link href="/" className="inline-block mt-8 text-sm link-app">Home</Link>
        </>
    );
}
