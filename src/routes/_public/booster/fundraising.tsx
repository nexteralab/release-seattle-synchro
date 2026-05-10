import { createFileRoute } from "@tanstack/react-router";
import { FundraisingPage } from "#/features/booster/fundraising/FundraisingPage";

export const Route = createFileRoute("/_public/booster/fundraising")({
  component: () => <FundraisingPage />,
});
