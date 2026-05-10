import { createFileRoute } from "@tanstack/react-router";
import { Home } from "#/components/Home";

const SITE_URL = "https://seattlesynchro.com";
const HOME_URL = `${SITE_URL}/`;
const OG_IMAGE = `${SITE_URL}/images/header.png`;
const TITLE = "Seattle Synchro | Premier Artistic Swimming Team";
const DESCRIPTION =
  "Seattle Synchro is the Pacific Northwest's premier artistic swimming team. Competitive, recreational, beginner and summer camp programs in Washington since 2001.";
const KEYWORDS =
  "artistic swimming, synchronized swimming, Seattle, Bellevue, Pacific Northwest, Washington, swim team, competitive swimming, kids swimming, summer camp, water sports";

const ORGANIZATION_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Seattle Synchro",
  alternateName: "Seattle Synchronized Swim Team",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: OG_IMAGE,
  description: DESCRIPTION,
  sport: "Artistic Swimming",
  foundingDate: "2001",
  address: {
    "@type": "PostalAddress",
    addressRegion: "WA",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/seattle_synchro/",
    "https://www.facebook.com/profile.php?id=100034431865593",
    "https://www.seattlesynchrosst.com/",
  ],
});

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:site_name", content: "Seattle Synchro" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: ORGANIZATION_JSONLD,
      },
    ],
  }),
  component: Home,
});
