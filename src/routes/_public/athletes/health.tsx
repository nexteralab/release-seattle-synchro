import { HealthWellnessPage } from "#/features/athletes/health-wellness/HealthWellnessPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/athletes/health")({
  component: () => <HealthWellnessPage />,
});
