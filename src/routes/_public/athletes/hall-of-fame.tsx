import { createFileRoute } from "@tanstack/react-router";
import { HallOfFamePage } from "#/features/athletes/hall-of-fame/HallOfFamePage";

export const Route = createFileRoute("/_public/athletes/hall-of-fame")({
  component: HallOfFamePage,
});
