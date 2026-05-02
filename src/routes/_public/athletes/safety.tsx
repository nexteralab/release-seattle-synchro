import { createFileRoute } from "@tanstack/react-router";
import { SafetyPage } from "#/features/athletes/safety/SafetyPage";

export const Route = createFileRoute("/_public/athletes/safety")({
  component: SafetyPage,
});
