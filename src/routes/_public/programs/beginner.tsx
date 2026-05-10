import { BeginnerPage, getBeginnerConfig } from "#/features/programs/beginner";
import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/programs/beginner`;
const OG_IMAGE = `${SITE_URL}/images/beginner_hero.jpg`;
const TITLE = "Beginner Artistic Swimming | Seattle Synchro";
const DESCRIPTION =
  "Start your artistic swimming journey. Our beginner program introduces fundamentals — strokes, sculls, breath control and basic figures — in a fun, supportive environment.";
const KEYWORDS =
  "beginner artistic swimming, learn synchronized swimming, intro swim class, Seattle beginner swim, kids swim lessons, basic swim figures, Bellevue WA";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Beginner Artistic Swimming",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  educationalLevel: "Beginner",
  provider: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  },
  about: { "@type": "Thing", name: "Artistic Swimming Fundamentals" },
  audience: { "@type": "Audience", audienceType: "First-time swimmers" },
});

export const Route = createFileRoute("/_public/programs/beginner")({
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
  loader: () => getBeginnerConfig(),
  component: RouteComponent,
});

function RouteComponent() {
  const config = Route.useLoaderData();
  return <BeginnerPage config={config} />;
}
