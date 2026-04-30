import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/programs/")({
  component: () => (
    <main className="py-24 px-12 md:px-48 max-w-screen-2xl mx-auto">
      <h1 className="font-['Space_Grotesk'] font-bold text-[#0A0A67] text-[48px] tracking-[-2.4px] uppercase">
        Programs
      </h1>
    </main>
  ),
});
