import { createFileRoute } from "@tanstack/react-router";
import { SportPsychologyPage } from "#/features/athletes/sport-psychology/SportPsychologyPage";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/athletes/sport-psychology`;
const OG_IMAGE = `${SITE_URL}/images/header.png`;
const TITLE = "Sport Psychology | Seattle Synchro";
const DESCRIPTION =
  "Mental performance for artistic swimmers. Resources, mindset training and sport psychology practices that help Seattle Synchro athletes thrive in training and competition.";
const KEYWORDS =
  "sport psychology, mental performance, athlete mindset, mental training, competition focus, sport psychology resources, artistic swimming mental, Seattle Synchro";

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
  about: { "@type": "Thing", name: "Sport Psychology and Mental Performance" },
});

export const Route = createFileRoute("/_public/athletes/sport-psychology")({
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
  component: () => <SportPsychologyPage />,
});
