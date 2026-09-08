import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ChapterSection } from "@/components/sections/ChapterSection";

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
      <main>
        <HeroSection />
        {/* Add more <ChapterSection /> stages here to extend the journey. */}
        <ChapterSection
          id="journey"
          index="Chapter I"
          title="THE JOURNEY"
          line="Every ridge you cross rewrites the distance to the next one."
        />
        <ChapterSection
          id="worlds"
          index="Chapter II"
          title="THE WORLDS"
          line="Layered terrains that drift apart as you move deeper into the frame."
          mirrored
        />
        <ChapterSection
          id="explore"
          index="Chapter III"
          title="EXPLORE"
          line="The horizon is not an edge. It is an invitation."
        />
      </main>
    </div>
  );
}
