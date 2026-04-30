import { RecreationalPage } from "#/features/programs/recreational";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/programs/recreational")({
  component: () => (
    <RecreationalPage />
  ),
});
