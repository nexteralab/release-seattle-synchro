import { HealthWellnessPage } from "#/features/athletes/health-wellness/HealthWellnessPage";
import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/athletes/health`;
const OG_IMAGE = `${SITE_URL}/images/header.png`;
const TITLE = "Athlete Health & Wellness | Seattle Synchro";
const DESCRIPTION =
  "Health, nutrition and wellness guidance for artistic swimmers — recovery, injury prevention, hydration and conditioning practices used at Seattle Synchro.";
const KEYWORDS =
  "athlete health, sport nutrition, swim recovery, injury prevention, hydration, conditioning, swimmer wellness, artistic swimming health, Seattle Synchro";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  author: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
  },
  publisher: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  about: { "@type": "Thing", name: "Athlete Health and Wellness" },
});

export const Route = createFileRoute("/_public/athletes/health")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
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
  component: () => <HealthWellnessPage />,
});
