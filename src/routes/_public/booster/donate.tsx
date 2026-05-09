import { createFileRoute } from "@tanstack/react-router";
import { DonatePage } from "#/features/booster/donate/DonatePage";

export const Route = createFileRoute("/_public/booster/donate")({
  component: DonatePage,
});
