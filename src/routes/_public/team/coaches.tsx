import { createFileRoute } from "@tanstack/react-router";
import { CoachesPage } from "#/features/team/coaches/CoachesPage";
import { publicCoachesQueryOptions } from "#/features/team/coaches/hooks/use-coaches";

const SITE_URL = "https://seattlesynchro.com";
const PAGE_URL = `${SITE_URL}/team/coaches`;
const OG_IMAGE = `${SITE_URL}/images/team.jpg`;
const TITLE = "Our Coaching Team | Seattle Synchro";
const DESCRIPTION =
  "Meet the dedicated coaches behind Seattle Synchro — nationally and internationally experienced artistic swimming professionals guiding athletes to excellence in the Pacific Northwest.";
const KEYWORDS =
  "Seattle Synchro coaches, artistic swimming coaches, synchronized swimming instructors, swim coaches Seattle, swim team coaching staff, professional swim coaches";

const SCHEMA_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  image: OG_IMAGE,
  inLanguage: "en-US",
  mainEntity: {
    "@type": "SportsOrganization",
    name: "Seattle Synchro",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    department: {
      "@type": "Organization",
      name: "Coaching Team",
      description:
        "Nationally and internationally experienced artistic swimming professionals.",
    },
  },
});

export const Route = createFileRoute("/_public/team/coaches")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publicCoachesQueryOptions),
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
  component: CoachesPage,
});
