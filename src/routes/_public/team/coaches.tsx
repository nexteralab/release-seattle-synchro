import { createFileRoute } from "@tanstack/react-router";
import { CoachesPage } from "#/features/team/coaches/CoachesPage";

export const Route = createFileRoute("/_public/team/coaches")({
  component: CoachesPage,
});
