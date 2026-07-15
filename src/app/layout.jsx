import "./globals.css";
import { Google_Sans } from "next/font/google";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE } from "@/config/site";

const googleSans = Google_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-google-sans",
    display: "swap",
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: DEFAULT_TITLE, template: "%s | Rushil Patel" },
    description: DEFAULT_DESCRIPTION,
    keywords: ["Rushil Patel", "full stack developer", "software developer", "web developer", "Next.js", "React", "JavaScript", "TypeScript", "AWS", "Cloud Technologies", "Java", "Python"],
    authors: [{ name: "Rushil Patel", url: SITE_URL }],
    creator: "Rushil Patel",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
    alternates: { canonical: SITE_URL },
    openGraph: { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: SITE_URL, siteName: "Rushil Patel", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Rushil Patel - Full Stack Developer" }], type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: [DEFAULT_OG_IMAGE], creator: "@rushil_b_patel" },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`light ${googleSans.variable} ${geist.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: `(function(){var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(localStorage.getItem('theme')||'light')})()` }} />
                <link rel="icon" type="image/svg+xml" href="/icon.svg" />
            </head>
            <body className="font-sans">
                <ThemeProvider>
                    <Navbar />
                    <main className="min-h-screen px-4 sm:px-6 py-12 md:py-16">
                        <div className="mx-auto w-full max-w-2xl">{children}</div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
