import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";

const RIDGES = [
  {
    speed: 0.34,
    className: "h-[40%] bg-ridge-far",
    clip:
      "polygon(0% 100%, 0% 55%, 9% 63%, 18% 47%, 28% 60%, 37% 44%, 48% 58%, 58% 46%, 68% 60%, 78% 48%, 88% 61%, 100% 52%, 100% 100%)",
  },
  {
    speed: 0.24,
    className: "h-[34%] bg-ridge-mid",
    clip:
      "polygon(0% 100%, 0% 60%, 11% 50%, 22% 64%, 33% 46%, 45% 62%, 56% 48%, 67% 63%, 78% 50%, 89% 62%, 100% 54%, 100% 100%)",
  },
  {
    speed: 0.13,
    className: "h-[26%] bg-ridge-near",
    clip:
      "polygon(0% 100%, 0% 62%, 13% 50%, 26% 66%, 40% 50%, 54% 67%, 68% 52%, 82% 66%, 100% 56%, 100% 100%)",
  },
  {
    speed: 0,
    className: "h-[15%] bg-ridge-front",
    clip:
      "polygon(0% 100%, 0% 64%, 16% 48%, 32% 66%, 50% 50%, 66% 66%, 82% 50%, 100% 64%, 100% 100%)",
  },
];

export function HeroSection() {
  return (
    <ParallaxSection id="top" className="bg-ink">
      {/* Sky */}
      <ParallaxLayer speed={0.5} zoom={0.06} className="absolute inset-0 bg-sky-horizon" />

      {/* Sun */}
      <ParallaxLayer
        speed={0.42}
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="relative top-[60%] h-[46vmax] w-[46vmax] -translate-y-1/2">
          <div className="animate-glow-pulse absolute inset-0 rounded-full bg-sun-halo" />
          <div className="absolute left-1/2 top-1/2 h-[18vmax] w-[18vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-core" />
        </div>
      </ParallaxLayer>

      {/* Cloud / haze bands */}
      <ParallaxLayer speed={0.36} className="pointer-events-none absolute inset-0">
        <div className="animate-haze absolute inset-x-[-6%] top-[42%] h-[60px] bg-ember/10 blur-2xl" />
        <div className="animate-haze-alt absolute inset-x-[-6%] top-[52%] h-[80px] bg-ember-soft/10 blur-2xl" />
        <div className="animate-haze-slow absolute inset-x-[-6%] top-[61%] h-[50px] bg-ember/10 blur-2xl" />
      </ParallaxLayer>

      {/* Mountain ridges */}
      {RIDGES.map((ridge) => (
        <ParallaxLayer
          key={ridge.className}
          speed={ridge.speed}
          className={`pointer-events-none absolute inset-x-0 bottom-0 ${ridge.className}`}
          style={{ clipPath: ridge.clip }}
        />
      ))}

      {/* Headline */}
      <ParallaxLayer
        speed={0.18}
        fadeOver={700}
        className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
      >
        <p
          className="animate-rise mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-ember-soft/80 sm:tracking-[0.45em] md:text-xs"
          style={{ animationDelay: "0.15s" }}
        >
          A cinematic parallax experience
        </p>
        <h1 className="animate-rise font-display leading-[0.85] text-cream" style={{ animationDelay: "0.3s" }}>
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
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
            &#8594;
          </span>
        </a>
      </ParallaxLayer>

      {/* Scroll cue */}
      <ParallaxLayer
        speed={0}
        fadeOver={300}
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
