import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { SceneCopy } from "@/components/sections/SceneCopy";
import { SceneEdges } from "@/components/SceneEdges";

function starField(seed: number, count: number, maxSize: number) {
  return Array.from({ length: count }).map((_, i) => {
    const a = Math.abs(Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
    const b = Math.abs(Math.sin(seed + i * 78.233) * 12345.6789) % 1;
    const c = Math.abs(Math.sin(seed + i * 39.425) * 24634.6345) % 1;
    return {
      left: `${(a * 100).toFixed(3)}%`,
      top: `${(b * 100).toFixed(3)}%`,
      size: Number((1 + c * maxSize).toFixed(3)),
      delay: Number((c * 6).toFixed(3)),
    };
  });
}

function Stars({ seed, count, maxSize, opacity }: { seed: number; count: number; maxSize: number; opacity: number }) {
  return (
    <>
      {starField(seed, count, maxSize).map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export function SpaceSection() {
  return (
    <ParallaxSection id="space" className="bg-ink" scrollLength="230vh">
      {/* BACKGROUND — void + nebula, slowest */}
      <ParallaxLayer
        speed={0.46}
        depth="background"
        zoom={0.07}
        mouse={3}
        className="bg-space-void absolute inset-x-0 -top-1/2 h-[200%]"
      />
      <ParallaxLayer speed={0.4} depth="background" mouse={6} className="pointer-events-none absolute inset-0">
        <Stars seed={2.3} count={90} maxSize={1.6} opacity={0.5} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.32} depth="background" mouse={10} className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-[22%] top-[30%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-nebula-1/25 blur-[110px]" />
        <div className="animate-glow-pulse absolute right-[8%] top-[54%] h-[50vh] w-[50vh] rounded-full bg-nebula-2/20 blur-[110px] [animation-delay:-3s]" />
      </ParallaxLayer>

      {/* MIDGROUND — planets */}
      <ParallaxLayer speed={0.18} mouse={20} className="pointer-events-none absolute inset-0">
        <div className="absolute right-[12%] top-[16%] h-[26vh] w-[26vh] rounded-full bg-[radial-gradient(circle_at_32%_30%,var(--nebula-2),var(--void)_78%)] shadow-[inset_-18px_-10px_40px_oklch(0.09_0.02_285/0.9)]" />
        <div className="absolute left-[9%] top-[62%] h-[12vh] w-[12vh] rounded-full bg-[radial-gradient(circle_at_35%_28%,var(--nebula-1),var(--void)_80%)]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.06} mouse={30} className="pointer-events-none absolute inset-0">
        <Stars seed={7.7} count={45} maxSize={2.4} opacity={0.85} />
      </ParallaxLayer>

      {/* FOREGROUND — drifting satellite + astronaut, fastest */}
      <ParallaxLayer speed={-0.24} depth="foreground" mouse={58} className="pointer-events-none absolute inset-0">
        <div className="animate-float-drift absolute left-[12%] top-[26%]">
          <div className="relative h-6 w-6 rounded-sm bg-cream/80">
            <span className="absolute -left-10 top-1 h-3 w-9 bg-nebula-2/70" />
            <span className="absolute -right-10 top-1 h-3 w-9 bg-nebula-2/70" />
            <span className="absolute -bottom-4 left-1/2 h-4 w-px bg-cream/50" />
          </div>
        </div>
        <div className="animate-float-drift absolute right-[18%] bottom-[22%] [animation-delay:-8s]">
          <div className="relative h-10 w-8 rounded-[45%] bg-cream/85">
            <span className="absolute left-1/2 top-2 h-3 w-5 -translate-x-1/2 rounded-full bg-void/80" />
            <span className="absolute -left-3 top-3 h-5 w-3 rounded-full bg-cream/70" />
            <span className="absolute -right-3 top-3 h-5 w-3 rounded-full bg-cream/70" />
            <span className="absolute -bottom-3 left-1 h-4 w-2.5 rounded-b-full bg-cream/70" />
            <span className="absolute -bottom-3 right-1 h-4 w-2.5 rounded-b-full bg-cream/70" />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.16}
        mouse={16}
        className="relative z-20 mx-auto flex h-full max-w-4xl items-center justify-center px-6"
      >
        <SceneCopy
          index="04 — Space"
          title="THERE ARE NO LIMITS"
          line="Past the last horizon, distance stops meaning anything at all."
          accentClassName="text-nebula-2"
        />
      </ParallaxLayer>

      <SceneEdges />
    </ParallaxSection>
  );
}
