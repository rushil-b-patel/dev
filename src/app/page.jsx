import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WritingSection from "@/components/WritingSection";
import WorkSection from "@/components/WorkSection";
import Quote from "@/components/Quote";
const GithubContributions = dynamic(() => import("@/components/GithubContributions"), { loading: () => null });
import { links as socialLinks } from "@/components/SocialMedia";
import { SITE_NAME, SITE_URL, PERSON_ID, WEBSITE_ID, JOB_TITLE, DEFAULT_TITLE, DEFAULT_DESCRIPTION, pageMetadata } from "@/config/site";

export const metadata = pageMetadata({ description: DEFAULT_DESCRIPTION, path: "" });

export default function Home() {
    const personSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": PERSON_ID,
                name: SITE_NAME,
                alternateName: ["Rushil Bhaveshkumar Patel", "Rushil B Patel"],
                url: SITE_URL,
                image: `${SITE_URL}/profile.jpg`,
                jobTitle: JOB_TITLE,
                worksFor: { "@type": "Organization", name: "Odoo", url: "https://www.odoo.com" },
                description: DEFAULT_DESCRIPTION,
                sameAs: socialLinks.filter(({ href }) => href.startsWith("http")).map(({ href }) => href),
                knowsAbout: ["JavaScript", "TypeScript", "Next.js", "React", "Odoo", "AWS", "Java", "Python", "C/C++", "Git", "GitHub", "Linux", "Web Development"],
            },
            { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE_NAME, url: SITE_URL, publisher: { "@id": PERSON_ID } },
            { "@type": "ProfilePage", "@id": `${SITE_URL}/#profile`, url: SITE_URL, name: DEFAULT_TITLE, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID } },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <Intro />
            <Experience />
            <WorkSection />
            <Projects />
            <WritingSection />
            <GithubContributions />
            <Quote />
        </>
    );
}
