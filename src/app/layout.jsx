import "./globals.css";
import { Google_Sans } from "next/font/google";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL, SITE_NAME, pageMetadata } from "@/config/site";

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
    ...pageMetadata({ description: DEFAULT_DESCRIPTION }),
    metadataBase: new URL(SITE_URL),
    title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`light ${googleSans.variable} ${geist.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: `(function(){var d=document.documentElement,t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.classList.remove('light','dark');d.classList.add(t)})()` }} />
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
