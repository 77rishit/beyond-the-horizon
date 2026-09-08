import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";

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
    <ParallaxSection id={id} className="bg-ink">
      <ParallaxLayer
        speed={0.3}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--ink) 0%, var(--ridge-mid) 55%, var(--ink) 100%)",
        }}
      />
      <ParallaxLayer speed={0.24} className="pointer-events-none absolute inset-0">
        <div className="animate-haze absolute inset-x-[-6%] top-[38%] h-[70px] bg-ember/10 blur-3xl" />
        <div className="animate-haze-alt absolute inset-x-[-6%] top-[58%] h-[90px] bg-ember-soft/10 blur-3xl" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.12}
        flipX={mirrored}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-ridge-near"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 58%, 15% 44%, 30% 62%, 47% 42%, 63% 63%, 80% 46%, 100% 60%, 100% 100%)",
        }}
      />
      <ParallaxLayer
        speed={0}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-ridge-front"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 62%, 18% 46%, 36% 64%, 54% 48%, 72% 65%, 88% 50%, 100% 62%, 100% 100%)",
        }}
      />

      <ParallaxLayer
        speed={0.1}
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ember-soft/70">
          {index}
        </span>
        <h2 className="mt-5 font-display text-[13vw] leading-[0.9] tracking-[0.04em] text-cream md:text-[7vw]">
          {title}
        </h2>
        <p className="mt-5 max-w-[38ch] text-sm font-light text-cream/70 md:text-base">{line}</p>
      </ParallaxLayer>
    </ParallaxSection>
  );
}
