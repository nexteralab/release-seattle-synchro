import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/programs`;
const OG_IMAGE = `${SITE_URL}/images/haderprogram.png`;
const TITLE = "Artistic Swimming Programs | Seattle Synchro";
const DESCRIPTION =
  "Explore Seattle Synchro's artistic swimming programs — competitive, recreational, beginner, summer camp and shows for athletes of all ages in the Pacific Northwest.";
const KEYWORDS =
  "artistic swimming programs, synchronized swimming Seattle, competitive swimming, recreational swimming, beginner swim, summer camp, swim shows, Pacific Northwest";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "en-US",
  about: { "@type": "SportsActivityLocation", name: "Seattle Synchro" },
  isPartOf: { "@type": "WebSite", name: "Seattle Synchro", url: SITE_URL },
  hasPart: [
    { "@type": "Course", name: "Competitive", url: `${SITE_URL}/programs/competitive` },
    { "@type": "Course", name: "Recreational", url: `${SITE_URL}/programs/recreational` },
    { "@type": "Course", name: "Beginner", url: `${SITE_URL}/programs/beginner` },
    { "@type": "Event", name: "Summer Camp", url: `${SITE_URL}/programs/summer-camp` },
    { "@type": "Event", name: "Shows", url: `${SITE_URL}/programs/shows` },
    { "@type": "Event", name: "Free Try", url: `${SITE_URL}/programs/free-try` },
  ],
});

export const Route = createFileRoute("/_public/programs/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:site_name", content: "Seattle Synchro" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: SCHEMA_JSONLD }],
  }),
  component: () => (
    <main className="py-24 px-12 md:px-48 max-w-screen-2xl mx-auto">
      <h1 className="font-['Space_Grotesk'] font-bold text-[#0A0A67] text-[48px] tracking-[-2.4px] uppercase">
        Programs
      </h1>
    </main>
  ),
});
