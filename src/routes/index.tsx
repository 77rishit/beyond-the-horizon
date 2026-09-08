import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterSection } from "@/components/sections/ChapterSection";
import { LearnSection } from "@/components/sections/LearnSection";
import { CitySection } from "@/components/sections/CitySection";
import { OceanSection } from "@/components/sections/OceanSection";
import { SpaceSection } from "@/components/sections/SpaceSection";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { Preloader } from "@/components/Preloader";
import { Particles } from "@/components/Particles";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JourneyProvider } from "@/components/journey/journey";
import { WorldToast } from "@/components/journey/WorldToast";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beyond the Horizon — A Cinematic Parallax Journey" },
      {
        name: "description",
        content:
          "Scroll to enter a world in motion: a cinematic, layered parallax journey through ridgelines, haze and a rising horizon.",
      },
      { property: "og:title", content: "Beyond the Horizon — A Cinematic Parallax Journey" },
      {
        property: "og:description",
        content:
          "Scroll to enter a world in motion: a cinematic, layered parallax journey through ridgelines, haze and a rising horizon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <JourneyProvider>
      <div className="relative bg-ink">
        <a
          href="#main"
          className="sr-only left-4 top-4 z-[110] bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream focus:not-sr-only focus:fixed"
        >
          Skip to content
        </a>
        <Preloader />
        <Particles />
        <SiteNav />
        <ScrollProgress />
        <WorldToast />
        <main id="main" tabIndex={-1}>
          <HeroSection />
          {/* Add more <ChapterSection /> stages here to extend the journey. */}
          <ChapterSection
            id="journey"
            index="01 — Mountains"
            title="THE JOURNEY"
            line="Every ridge you cross rewrites the distance to the next one."
          />
          <LearnSection />
          <CitySection />
          <OceanSection />
          <SpaceSection />
          <FinaleSection />
        </main>
        <SiteFooter />
      </div>
    </JourneyProvider>
  );
}
