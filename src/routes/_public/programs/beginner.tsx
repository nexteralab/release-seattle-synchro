import { BeginnerPage } from "#/features/programs/beginner/BeginnerPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/programs/beginner")({
  component: () => (
    <BeginnerPage />
  ),
});
