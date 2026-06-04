import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import BlogSection from "@/components/BlogSection";
const GithubContributions = dynamic(() => import("@/components/GithubContributions"), { loading: () => null });
import Quote from "@/components/Quote";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/config/site";

export default function Home() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        jobTitle: "Full Stack Developer",
        description: "Full Stack Developer specializing in web development, modern JavaScript and Cloud Technologies",
        sameAs: ["https://github.com/rushil-b-patel", "https://linkedin.com/in/rushil-b-patel"],
        knowsAbout: ["JavaScript", "TypeScript", "Next", "React", "AWS", "Java", "Python", "C/C++", "Git", "GitHub", "Linux", "Cloud Technologies", "Web Development"],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <Intro />
            <Stack />
            <Experience />
            <Work />
            <Projects />
            <BlogSection />
            <GithubContributions />
            <Quote />
        </>
    );
}
