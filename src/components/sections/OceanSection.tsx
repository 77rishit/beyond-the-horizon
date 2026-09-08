import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { SceneCopy } from "@/components/sections/SceneCopy";
import { SceneEdges } from "@/components/SceneEdges";

function Whale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 140" className={className} fill="currentColor" aria-hidden>
      <path d="M8 84c46-44 132-70 208-58 44 7 78 27 100 46-10 12-24 22-44 30-58 24-142 26-206 6-30-9-49-16-58-24z" />
      <path d="M368 72c10-16 22-28 30-30 2 20 0 40-6 56-8-6-17-15-24-26z" />
      <path d="M150 30c14-14 32-22 48-24-6 14-16 26-28 34-7-3-14-6-20-10z" />
    </svg>
  );
}

function Bubble({
  left,
  size,
  duration,
  delay,
}: {
  left: string;
  size: number;
  duration: number;
  delay: number;
}) {
  return (
    <span
      className="animate-bubble absolute bottom-0 rounded-full border border-lagoon/50 bg-lagoon/10"
      style={{
        left,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

const bubbles = [
  { left: "8%", size: 6, duration: 15, delay: 0 },
  { left: "17%", size: 10, duration: 19, delay: 3 },
  { left: "29%", size: 4, duration: 13, delay: 7 },
  { left: "41%", size: 8, duration: 21, delay: 1 },
  { left: "53%", size: 5, duration: 16, delay: 9 },
  { left: "66%", size: 12, duration: 23, delay: 4 },
  { left: "78%", size: 6, duration: 17, delay: 11 },
  { left: "89%", size: 9, duration: 20, delay: 6 },
];

function Kelp({ left, height, delay }: { left: string; height: string; delay: number }) {
  return (
    <div
      className="animate-sway absolute bottom-0 w-[3vw] max-w-[38px] rounded-t-full bg-kelp"
      style={{
        left,
        height,
        animationDelay: `${delay}s`,
        clipPath: "polygon(38% 100%, 20% 60%, 42% 0%, 62% 58%, 62% 100%)",
      }}
    />
  );
}

export function OceanSection() {
  return (
    <ParallaxSection id="ocean" className="bg-ink" scrollLength="220vh">
      {/* BACKGROUND — water column + light shafts */}
      <ParallaxLayer
        speed={0.44}
        depth="background"
        zoom={0.05}
        mouse={4}
        className="bg-ocean-deep absolute inset-x-0 -top-1/2 h-[200%]"
      />
      <ParallaxLayer speed={0.38} depth="background" mouse={9} className="pointer-events-none absolute inset-0">
        <div className="animate-haze-slow absolute -top-[10%] left-[14%] h-[85%] w-[16vw] -rotate-6 bg-lagoon/20 blur-2xl" />
        <div className="animate-haze-alt absolute -top-[10%] left-[52%] h-[75%] w-[10vw] rotate-3 bg-lagoon/16 blur-2xl" />
        <div className="animate-haze absolute -top-[10%] right-[10%] h-[70%] w-[13vw] rotate-8 bg-lagoon/8 blur-2xl" />
      </ParallaxLayer>

      {/* BACKGROUND — distant creatures */}
      <ParallaxLayer speed={0.28} depth="background" mouse={12} className="pointer-events-none absolute inset-0">
        <Whale className="animate-float-drift absolute left-[8%] top-[24%] w-[38vw] text-lagoon/25" />
        <Whale className="animate-float-drift absolute right-[6%] top-[52%] w-[22vw] -scale-x-100 text-lagoon/16 [animation-delay:-6s]" />
      </ParallaxLayer>

      {/* MIDGROUND — bubbles */}
      <ParallaxLayer speed={0.06} mouse={28} className="pointer-events-none absolute inset-0">
        {bubbles.map((b) => (
          <Bubble key={b.left} {...b} />
        ))}
      </ParallaxLayer>

      {/* FOREGROUND — coral + kelp, fastest */}
      <ParallaxLayer
        speed={-0.22}
        depth="foreground"
        mouse={56}
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] h-[46%]"
      >
        <Kelp left="4%" height="62%" delay={0} />
        <Kelp left="11%" height="84%" delay={-2} />
        <Kelp left="19%" height="52%" delay={-4} />
        <Kelp left="74%" height="70%" delay={-1} />
        <Kelp left="83%" height="92%" delay={-5} />
        <Kelp left="92%" height="58%" delay={-3} />
        <div
          className="absolute inset-x-0 bottom-0 h-[38%] bg-kelp/80"
          style={{
            clipPath:
              "polygon(0% 100%, 0% 52%, 9% 30%, 18% 58%, 30% 34%, 44% 62%, 58% 38%, 71% 64%, 84% 36%, 100% 56%, 100% 100%)",
          }}
        />
        <div className="absolute bottom-[6%] left-[30%] h-[16%] w-[8vw] rounded-t-full bg-coral/55 blur-[1px]" />
        <div className="absolute bottom-[4%] left-[62%] h-[12%] w-[6vw] rounded-t-full bg-coral/45 blur-[1px]" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.16}
        mouse={16}
        className="relative z-20 mx-auto flex h-full max-w-4xl items-center justify-center px-6"
      >
        <SceneCopy
          index="03 — Ocean"
          title="DISCOVER THE UNKNOWN"
          line="Below the light, the world keeps moving without an audience."
          accentClassName="text-lagoon/80"
        />
      </ParallaxLayer>

      <SceneEdges />
    </ParallaxSection>
  );
}
