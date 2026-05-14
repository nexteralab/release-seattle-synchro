import PrivateLessonsPage from "#/features/programs/private-lessons";
import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/programs/private-lessons`;
const OG_IMAGE = `${SITE_URL}/images/private_lessons_hero.jpg`;
const TITLE = "Private Lessons | Seattle Synchro";
const DESCRIPTION =
  "One-on-one artistic swimming coaching. Private lessons focus on specific skills, drills and new movements as a supplement to scheduled team practice.";
const KEYWORDS =
  "private artistic swimming lessons, synchronized swimming private coaching, one on one swim lessons, Seattle synchro coach, personalized swim training, Bellevue WA";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seattle Synchro Private Lessons",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  serviceType: "Private artistic swimming coaching",
  provider: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  areaServed: { "@type": "Place", name: "Seattle, WA" },
  audience: { "@type": "Audience", audienceType: "Artistic swimmers" },
});

export const Route = createFileRoute("/_public/programs/private-lessons")({
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
  component: () => <PrivateLessonsPage />,
});
