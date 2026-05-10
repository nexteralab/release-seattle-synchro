import { createFileRoute } from "@tanstack/react-router";
import { KnoxingPage } from "#/features/athletes/knoxing/KnoxingPage";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/athletes/knoxing`;
const OG_IMAGE = `${SITE_URL}/images/header.png`;
const TITLE = "Knoxing — Hair Gel Guide | Seattle Synchro";
const DESCRIPTION =
  "Step-by-step guide to gelling (knoxing) hair for an artistic swimming meet. Supplies, technique and tips to keep your bun rock-solid from warm-up to the final bow.";
const KEYWORDS =
  "knoxing, hair gel artistic swimming, synchronized swimming bun, hair preparation swim meet, swimming hair tutorial, knox gelatine, swim bun guide";

const HOWTO_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Gel Your Hair for an Artistic Swimming Meet",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  totalTime: "PT30M",
  supply: [
    { "@type": "HowToSupply", name: "Hair gel (1–2 tubes)" },
    { "@type": "HowToSupply", name: "Rat-tail comb" },
    { "@type": "HowToSupply", name: "Firm-bristle brush" },
    { "@type": "HowToSupply", name: "Hair net" },
    { "@type": "HowToSupply", name: "Bobby pins or hair clips" },
    { "@type": "HowToSupply", name: "Edge control or hairspray" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Prepare Your Hair",
      text: "Start with clean, slightly damp hair. Detangle, mark your part, and section.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Apply the Gel",
      text: "Work gel evenly through each section, then smooth and gather into the bun.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set and Secure",
      text: "Wrap the hair net, apply a thin layer of gel over it, and let it set 15–20 minutes.",
    },
  ],
});

export const Route = createFileRoute("/_public/athletes/knoxing")({
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
    scripts: [{ type: "application/ld+json", children: HOWTO_JSONLD }],
  }),
  component: () => <KnoxingPage />,
});
