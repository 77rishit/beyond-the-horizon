import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";

/** Distant + mid ridgelines (background / midground). */
const RIDGES = [
  {
    key: "far",
    speed: 0.42,
    mouse: 8,
    className: "h-[40%] bg-ridge-far",
    clip:
      "polygon(0% 100%, 0% 55%, 9% 63%, 18% 47%, 28% 60%, 37% 44%, 48% 58%, 58% 46%, 68% 60%, 78% 48%, 88% 61%, 100% 52%, 100% 100%)",
  },
  {
    key: "mid",
    speed: 0.22,
    mouse: 16,
    className: "h-[34%] bg-ridge-mid",
    clip:
      "polygon(0% 100%, 0% 60%, 11% 50%, 22% 64%, 33% 46%, 45% 62%, 56% 48%, 67% 63%, 78% 50%, 89% 62%, 100% 54%, 100% 100%)",
  },
  {
    key: "near",
    speed: 0.06,
    mouse: 26,
    className: "h-[26%] bg-ridge-near",
    clip:
      "polygon(0% 100%, 0% 62%, 13% 50%, 26% 66%, 40% 50%, 54% 67%, 68% 52%, 82% 66%, 100% 56%, 100% 100%)",
  },
];

/** Midground pine silhouettes along the near ridge. */
const TREES = Array.from({ length: 26 }, (_, i) => {
  const x = (i + 0.5) * (1440 / 26) + (i % 3) * 9 - 9;
  const h = 46 + ((i * 37) % 40);
  const w = 12 + ((i * 13) % 9);
  return { x, h, w, key: `t${i}` };
});

/** Foreground grass blades. */
const BLADES = Array.from({ length: 44 }, (_, i) => {
  const x = i * (1440 / 44) + ((i * 17) % 11);
  const h = 20 + ((i * 29) % 34);
  const lean = ((i * 7) % 13) - 6;
  return { x, h, lean, key: `b${i}` };
});

export function HeroSection() {
  return (
    <ParallaxSection id="top" className="bg-ink" scrollLength="170vh">
      {/* ---------- BACKGROUND (slowest) ---------- */}
      <ParallaxLayer
        speed={0.38}
        zoom={0.08}
        mouse={4}
        className="absolute inset-x-0 -top-1/2 h-[200%] bg-sky-horizon"
      />

      <ParallaxLayer
        speed={0.3}
        mouse={6}
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="relative top-[60%] h-[46vmax] w-[46vmax] -translate-y-1/2">
          <div className="animate-glow-pulse absolute inset-0 rounded-full bg-sun-halo" />
          <div className="absolute left-1/2 top-1/2 h-[18vmax] w-[18vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-core" />
        </div>
      </ParallaxLayer>

      {/* ---------- MIDGROUND (medium) ---------- */}
      <ParallaxLayer speed={0.22} mouse={12} className="pointer-events-none absolute inset-0">
        <div className="animate-haze absolute inset-x-[-10%] top-[24%] h-[70px] rounded-full bg-cream/8 blur-3xl" />
        <div className="animate-haze-alt absolute inset-x-[-10%] top-[42%] h-[60px] bg-ember/12 blur-2xl" />
        <div className="animate-haze-slow absolute inset-x-[-10%] top-[52%] h-[80px] bg-ember-soft/12 blur-2xl" />
        <div className="animate-haze absolute inset-x-[-10%] top-[61%] h-[50px] bg-ember/10 blur-2xl" />
      </ParallaxLayer>

      {RIDGES.map((ridge) => (
        <ParallaxLayer
          key={ridge.key}
          speed={ridge.speed}
          mouse={ridge.mouse}
          className={`pointer-events-none absolute inset-x-0 bottom-0 ${ridge.className}`}
          style={{ clipPath: ridge.clip }}
        />
      ))}

      {/* Tree line — closer midground */}
      <ParallaxLayer
        speed={-0.04}
        mouse={34}
        className="pointer-events-none absolute inset-x-[-4%] bottom-[8%]"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-[9vh] w-full min-h-[52px] fill-ridge-front"
        >
          {TREES.map((t) => (
            <polygon
              key={t.key}
              points={`${t.x},${100 - t.h} ${t.x - t.w},100 ${t.x + t.w},100`}
            />
          ))}
        </svg>
      </ParallaxLayer>

      {/* ---------- FOREGROUND (fastest) ---------- */}
      <ParallaxLayer
        speed={-0.16}
        mouse={52}
        className="pointer-events-none absolute inset-x-[-6%] bottom-[-4%]"
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="h-[24vh] w-full min-h-[140px]"
        >
          {/* grass blades catching the last light */}
          <g className="fill-ridge-front">
            {BLADES.map((b) => (
              <path
                key={b.key}
                d={`M${b.x},120 Q${b.x + b.lean},${120 - b.h / 2} ${b.x + b.lean * 2},${120 - b.h} Q${b.x + b.lean},${120 - b.h / 2} ${b.x + 4},120 Z`}
              />
            ))}
          </g>
          {/* rocks */}
          <ellipse cx="190" cy="150" rx="120" ry="46" className="fill-ridge-front" />
          <ellipse cx="1230" cy="156" rx="150" ry="52" className="fill-ridge-front" />
          <ellipse cx="700" cy="176" rx="210" ry="44" className="fill-ridge-front" />
          {/* ground */}
          <path
            d="M0,200 L0,132 Q240,108 480,130 Q720,152 960,126 Q1200,102 1440,134 L1440,200 Z"
            className="fill-ridge-front"
          />
        </svg>
      </ParallaxLayer>

      {/* ---------- CONTENT ---------- */}
      <ParallaxLayer
        speed={0.16}
        fadeOver={760}
        mouse={20}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="animate-rise mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-ember-soft/80 sm:tracking-[0.45em] md:text-xs"
          style={{ animationDelay: "0.15s" }}
        >
          A cinematic parallax experience
        </p>
        <h1
          className="animate-rise font-display leading-[0.85] text-cream"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="block text-[16vw] tracking-[0.04em] md:text-[11vw]">BEYOND</span>
          <span className="block text-[16vw] tracking-[0.04em] md:text-[11vw]">THE HORIZON</span>
        </h1>
        <p
          className="animate-rise mt-6 max-w-[34ch] text-sm font-light text-cream/70 md:text-base"
          style={{ animationDelay: "0.55s" }}
        >
          Scroll to enter a world in motion.
        </p>
        <a
          href="#journey"
          className="group animate-rise mt-9 inline-flex items-center gap-3 border border-cream/25 bg-ink/20 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cream transition-colors duration-500 hover:border-ember hover:text-ember-soft sm:px-8 sm:text-[11px] sm:tracking-[0.3em]"
          style={{ animationDelay: "0.7s" }}
        >
          BEGIN THE JOURNEY
          <span
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            &#8594;
          </span>
        </a>
      </ParallaxLayer>

      <ParallaxLayer
        speed={0}
        fadeOver={260}
        className="absolute inset-x-0 bottom-7 z-30 flex justify-center"
      >
        <div className="animate-cue-bob flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cream/60 sm:text-[10px]">
            Scroll to explore
          </span>
          <span aria-hidden="true" className="text-lg text-cream/60">
            &#8595;
          </span>
        </div>
      </ParallaxLayer>
    </ParallaxSection>
  );
}
