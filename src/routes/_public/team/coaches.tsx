import { createFileRoute } from "@tanstack/react-router";
import { CoachesPage } from "#/features/team/coaches/CoachesPage";
import { publicCoachesQueryOptions } from "#/features/team/coaches/hooks/use-coaches";

export const Route = createFileRoute("/_public/team/coaches")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(publicCoachesQueryOptions),
  head: () => ({
    meta: [
      { title: "Our Coaching Team | Seattle Synchro" },
      {
        name: "description",
        content:
          "Meet the dedicated coaches behind Seattle Synchro — nationally and internationally experienced artistic swimming professionals guiding athletes to excellence in the Pacific Northwest.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Our Coaching Team | Seattle Synchro" },
      {
        property: "og:description",
        content:
          "Meet the dedicated coaches behind Seattle Synchro — nationally and internationally experienced artistic swimming professionals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachesPage,
});
