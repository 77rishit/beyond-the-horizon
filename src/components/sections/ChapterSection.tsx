import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { SceneCopy } from "@/components/sections/SceneCopy";
import { SceneEdges } from "@/components/SceneEdges";

type ChapterSectionProps = {
  id: string;
  index: string;
  title: string;
  line: string;
  /** Flip the ridge silhouette so consecutive chapters don't repeat. */
  mirrored?: boolean;
};

/**
 * A reusable parallax chapter. Add more of these to src/routes/index.tsx
 * to extend the experience.
 */
export function ChapterSection({ id, index, title, line, mirrored }: ChapterSectionProps) {
  return (
    <ParallaxSection id={id} className="bg-ink" scrollLength="170vh">
      <ParallaxLayer
        speed={0.3}
        depth="background"
        mouse={4}
        className="absolute inset-x-0 -top-1/2 h-[200%]"
        style={{
          background:
            "linear-gradient(to bottom, var(--ink) 0%, var(--ridge-mid) 55%, var(--ink) 100%)",
        }}
      />
      <ParallaxLayer speed={0.24} driftX={70} blur={1.2} mouse={12} className="pointer-events-none absolute inset-0">
        <div className="animate-haze absolute inset-x-[-6%] top-[38%] h-[70px] bg-ember/10 blur-3xl" />
        <div className="animate-haze-alt absolute inset-x-[-6%] top-[58%] h-[90px] bg-ember-soft/10 blur-3xl" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.12}
        driftX={18}
        mouse={26}
        flipX={mirrored === true}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-ridge-near"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 58%, 15% 44%, 30% 62%, 47% 42%, 63% 63%, 80% 46%, 100% 60%, 100% 100%)",
        }}
      />
      <ParallaxLayer
        speed={-0.14}
        depth="foreground"
        driftX={-40}
        rotate={0.5}
        mouse={48}
        className="pointer-events-none absolute inset-x-0 bottom-[-12%] h-[26%] bg-ridge-front"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 62%, 18% 46%, 36% 64%, 54% 48%, 72% 65%, 88% 50%, 100% 62%, 100% 100%)",
        }}
      />

      <ParallaxLayer
        speed={0.1}
        mouse={16}
        className="relative z-20 mx-auto flex h-full max-w-4xl items-center justify-center px-6"
      >
        <SceneCopy index={index} title={title} line={line} />
      </ParallaxLayer>

      <SceneEdges />
    </ParallaxSection>
  );
}
