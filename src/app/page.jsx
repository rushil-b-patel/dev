import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WritingSection from "@/components/WritingSection";
import WorkSection from "@/components/WorkSection";
import Quote from "@/components/Quote";
const GithubContributions = dynamic(() => import("@/components/GithubContributions"), { loading: () => null });
import { links as socialLinks } from "@/components/SocialMedia";
import { SITE_NAME, SITE_URL, PERSON_ID } from "@/config/site";

export default function Home() {
    // One Person entity (with every profile in sameAs) + a WebSite naming the site, so Google
    // can tell this Rushil Patel apart from the others and show "Rushil Patel" as the site name.
    const personSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": PERSON_ID,
                name: SITE_NAME,
                alternateName: "Rushil Bhaveshkumar Patel",
                url: SITE_URL,
                image: `${SITE_URL}/profile.jpg`,
                jobTitle: "Full Stack Developer",
                worksFor: { "@type": "Organization", name: "Odoo", url: "https://www.odoo.com" },
                description: "Full Stack Developer specializing in web development, modern JavaScript and Cloud Technologies",
                sameAs: socialLinks.filter(({ href }) => href.startsWith("http")).map(({ href }) => href),
                knowsAbout: ["JavaScript", "TypeScript", "Next", "React", "AWS", "Java", "Python", "C/C++", "Git", "GitHub", "Linux", "Cloud Technologies", "Web Development"],
            },
            { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, publisher: { "@id": PERSON_ID } },
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
