import ShowPage from "#/features/programs/shows";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/programs/shows")({
  component: () => (
    <ShowPage />
  ),
});
