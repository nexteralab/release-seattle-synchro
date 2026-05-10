import { createFileRoute } from "@tanstack/react-router";
import { FundraisingPage } from "#/features/booster/fundraising/FundraisingPage";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/booster/fundraising`;
const OG_IMAGE = `${SITE_URL}/images/header.png`;
const TITLE = "Fundraising | Seattle Synchro Booster Club";
const DESCRIPTION =
  "Help raise funds for Seattle Synchro programs and athletes. Support us through AmazonSmile, Give with Bing and SwimOutlet — every purchase makes a difference.";
const KEYWORDS =
  "fundraising, Seattle Synchro booster, AmazonSmile, Give with Bing, SwimOutlet, support swim team, charity shopping, donation programs";

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
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Fundraising Partners",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AmazonSmile",
        url: "https://smile.amazon.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Give with Bing",
        url: "https://rewards.bing.com/redeem/donate?form=gwbredirect",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SwimOutlet",
        url: "https://www.swimoutlet.com/collections/seattlesynchro",
      },
    ],
  },
});

export const Route = createFileRoute("/_public/booster/fundraising")({
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
  component: () => <FundraisingPage />,
});
