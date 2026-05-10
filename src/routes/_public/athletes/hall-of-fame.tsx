import { createFileRoute } from "@tanstack/react-router";
import { HallOfFamePage } from "#/features/athletes/hall-of-fame/HallOfFamePage";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/athletes/hall-of-fame`;
const OG_IMAGE = `${SITE_URL}/images/hall_of_fame.webp`;
const TITLE = "Hall of Fame | Seattle Synchro";
const DESCRIPTION =
  "Celebrating the legendary athletes, coaches and contributors who have shaped Seattle Synchro and the artistic swimming community in the Pacific Northwest.";
const KEYWORDS =
  "Seattle Synchro hall of fame, artistic swimming legends, synchronized swimming history, swim team alumni, coach legacy, swim achievements, Pacific Northwest";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  about: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
  },
  isPartOf: { "@type": "WebSite", name: "Seattle Synchro", url: SITE_URL },
});

export const Route = createFileRoute("/_public/athletes/hall-of-fame")({
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
  component: HallOfFamePage,
});
