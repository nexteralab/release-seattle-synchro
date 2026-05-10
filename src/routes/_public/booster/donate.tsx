import { createFileRoute } from "@tanstack/react-router";
import { DonatePage } from "#/features/booster/donate/DonatePage";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/booster/donate`;
const OG_IMAGE = `${SITE_URL}/images/hero_donate.webp`;
const TITLE = "Donate | Seattle Synchro Booster Club";
const DESCRIPTION =
  "Support Seattle Synchro athletes. Your donation funds scholarships, equipment, travel and coaching that keep artistic swimming thriving in the Pacific Northwest.";
const KEYWORDS =
  "donate, Seattle Synchro donation, support artistic swimming, booster club, scholarship fund, swim team funding, charitable donation, nonprofit swim";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  about: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro Booster Club",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  potentialAction: {
    "@type": "DonateAction",
    name: "Donate to Seattle Synchro",
    target: PAGE_URL,
    recipient: {
      "@type": "SportsOrganization",
      name: "Seattle Synchro",
      url: SITE_URL,
    },
  },
});

export const Route = createFileRoute("/_public/booster/donate")({
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
  component: DonatePage,
});
