import { Helmet } from "react-helmet-async";
import BlogSection from "../components/BlogSection";
import GithubContributions from "../components/GithubContributions";
import Quote from "../components/Quote";
import Skills from "../components/Stack";
import Experience from "./Experience";
import Intro from "./Intro";
import Projects from "./Projects";
import Work from "./Work";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "../config/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in web development, modern JavaScript and Cloud Technologies",
  sameAs: [
    "https://github.com/rushil-b-patel",
    "https://linkedin.com/in/rushil-b-patel",
  ],
  knowsAbout: [
    "JavaScript", "TypeScript", "Next", "React", "AWS",
    "Java", "Python", "C/C++", "Git", "GitHub", "Linux",
    "Cloud Technologies", "Web Development",
  ],
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta name="keywords" content="Rushil Patel, full stack developer, software developer, web developer, Next.js, React, JavaScript, TypeScript, AWS, Cloud Technologies, java, programming, git, github, python" />
        <meta name="author" content={SITE_NAME} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_URL}/`} />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      <Intro />
      <Skills />
      <Experience />
      <Work />
      <Projects />
      <BlogSection />
      <GithubContributions />
      <Quote />
    </>
  );
}
