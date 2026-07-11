"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { RESUME_PDF_URL } from "@/config/site";

export default function Navbar() {
    const pathname = usePathname();
    const navLinkClass = (href) =>
        `text-sm font-medium transition-colors duration-200 ${pathname === href ? "text-app-primary" : "text-app-muted hover:text-app-primary"}`;

    return (
        <header className="w-full px-4 sm:px-6">
            <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between">
                <nav className="flex items-center gap-6" aria-label="Primary">
                    <Link href="/" className={navLinkClass("/")}>Home</Link>
                    <Link href="/blog" className={navLinkClass("/blog")}>Blog</Link>
                    <a href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-app-muted transition-colors duration-200 hover:text-app-primary">Resume</a>
                </nav>
                <ThemeToggle />
            </div>
        </header>
    );
}
