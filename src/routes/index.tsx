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
        <Preloader />
        <Particles />
        <SiteNav />
        <ScrollProgress />
        <WorldToast />
        <main>
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
      </div>
    </JourneyProvider>
  );
}
