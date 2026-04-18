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
  SITE_URL,
} from "../config/site";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
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
