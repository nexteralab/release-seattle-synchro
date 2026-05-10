import { RecreationalPage, getRecreationalConfig } from "#/features/programs/recreational";
import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/programs/recreational`;
const OG_IMAGE = `${SITE_URL}/images/recreational_hero.png`;
const TITLE = "Recreational Artistic Swimming | Seattle Synchro";
const DESCRIPTION =
  "Build technique, fitness and friendships in our recreational artistic swimming program. Designed for swimmers who love the sport and want a balanced training schedule.";
const KEYWORDS =
  "recreational swimming, artistic swimming for fun, synchronized swimming class, Seattle swim community, balanced swim training, Bellevue WA, swim fitness";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Recreational Artistic Swimming",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  educationalLevel: "Intermediate",
  provider: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  about: { "@type": "Thing", name: "Artistic Swimming" },
  audience: { "@type": "Audience", audienceType: "Recreational swimmers" },
});

export const Route = createFileRoute("/_public/programs/recreational")({
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
  loader: () => getRecreationalConfig(),
  component: RouteComponent,
});

function RouteComponent() {
  const config = Route.useLoaderData();
  return <RecreationalPage config={config} />;
}
