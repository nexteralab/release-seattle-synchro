import { createFileRoute, redirect } from "@tanstack/react-router";

// /booster no tiene página propia: la principal del Booster Club es Donate
export const Route = createFileRoute("/_public/booster/")({
  beforeLoad: () => {
    throw redirect({ to: "/booster/donate", statusCode: 301 });
  },
});
