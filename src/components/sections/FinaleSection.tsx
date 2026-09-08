import type { MouseEvent } from "react";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { SceneCopy } from "@/components/sections/SceneCopy";
import { SceneEdges } from "@/components/SceneEdges";
import { CinematicButton } from "@/components/CinematicButton";
import { useInView } from "@/components/parallax/useInView";

/** Closing scene — the loop back to the beginning. */
export function FinaleSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ParallaxSection id="finale" className="bg-ink" scrollLength="150vh">
      <ParallaxLayer
        speed={0.4}
        depth="background"
        zoom={0.05}
        mouse={4}
        className="absolute inset-x-0 -top-1/2 h-[200%]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 62%, oklch(0.3 0.06 300) 0%, oklch(0.18 0.035 288) 38%, var(--ink) 78%)",
        }}
      />
      <ParallaxLayer speed={0.3} depth="background" driftX={50} rotate={4} mouse={10} className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-1/2 top-[58%] h-[52vmax] w-[52vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-halo opacity-40" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.1}
        mouse={26}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-ridge-near"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 56%, 16% 44%, 33% 62%, 50% 42%, 67% 62%, 84% 46%, 100% 58%, 100% 100%)",
        }}
      />
      <ParallaxLayer
        speed={-0.18}
        depth="foreground"
        driftX={-40}
        mouse={50}
        className="pointer-events-none absolute inset-x-0 bottom-[-10%] h-[22%] bg-ridge-front"
        style={{
          clipPath:
            "polygon(0% 100%, 0% 62%, 20% 48%, 40% 66%, 58% 48%, 76% 64%, 92% 50%, 100% 60%, 100% 100%)",
        }}
      />

      <ParallaxLayer
        speed={0.14}
        mouse={16}
        className="relative z-20 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6"
      >
        <SceneCopy
          index="05 — Return"
          title="THE JOURNEY NEVER ENDS."
          line="Every scroll reveals another world."
        />
        <div
          ref={ref}
          className={`mt-10 transition-all duration-1000 ease-[var(--ease-cinematic)] ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "520ms" }}
        >
          <CinematicButton href="#top" arrow="up" onClick={backToTop}>
            START AGAIN
          </CinematicButton>
        </div>
      </ParallaxLayer>

      <SceneEdges />
    </ParallaxSection>
  );
}
