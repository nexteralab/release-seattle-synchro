import { createFileRoute } from "@tanstack/react-router";
import { KnoxingPage } from "#/features/athletes/knoxing/KnoxingPage";

export const Route = createFileRoute("/_public/athletes/knoxing")({
  component: () => <KnoxingPage />,
});
