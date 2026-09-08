import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterSection } from "@/components/sections/ChapterSection";
import { CitySection } from "@/components/sections/CitySection";
import { OceanSection } from "@/components/sections/OceanSection";
import { SpaceSection } from "@/components/sections/SpaceSection";
import { ScrollProgress } from "@/components/ScrollProgress";

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
    <div className="relative bg-ink">
      <SiteNav />
      <ScrollProgress />
      <main>
        <HeroSection />
        {/* Add more <ChapterSection /> stages here to extend the journey. */}
        <ChapterSection
          id="journey"
          index="01 — Journey"
          title="THE JOURNEY"
          line="Every ridge you cross rewrites the distance to the next one."
        />
        <CitySection />
        <OceanSection />
        <SpaceSection />
      </main>
    </div>
  );
}
