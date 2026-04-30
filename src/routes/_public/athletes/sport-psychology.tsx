import { createFileRoute } from "@tanstack/react-router";
import { SportPsychologyPage } from "#/features/athletes/sport-psychology/SportPsychologyPage";

export const Route = createFileRoute("/_public/athletes/sport-psychology")({
  component: () => <SportPsychologyPage />,
});
