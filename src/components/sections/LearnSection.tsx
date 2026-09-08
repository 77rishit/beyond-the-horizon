import { Layers, MousePointer2, Sparkles, Globe2, type LucideIcon } from "lucide-react";
import { useInView } from "@/components/parallax/useInView";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { SceneEdges } from "@/components/SceneEdges";
import { cn } from "@/lib/utils";

type Card = {
  icon: LucideIcon;
  kicker: string;
  body?: string;
  list?: string[];
};

const CARDS: Card[] = [
  {
    icon: Layers,
    kicker: "What is parallax?",
    body: "A technique where visual elements move at different speeds while you scroll, so a flat screen reads as a scene with real distance.",
  },
  {
    icon: MousePointer2,
    kicker: "How does it work?",
    body: "Each layer is given a scroll multiplier. Distant planes shift a fraction of the scroll, near planes shift more than it, and the gap between them becomes depth.",
  },
  {
    icon: Sparkles,
    kicker: "Why speeds create depth",
    body: "Your eyes judge distance by how fast things slide past. Far mountains barely move, roadside grass rushes by — the same rule, reproduced in pixels.",
  },
  {
    icon: Globe2,
    kicker: "Where it is used",
    list: [
      "Interactive storytelling",
      "Product launch pages",
      "Portfolio websites",
      "Digital campaigns",
      "Game-inspired interfaces",
    ],
  },
];

/** Scroll multipliers shown in the live demo, slowest plane first. */
const PLANES = [
  { label: "Background", factor: "0.2×", drift: 70, opacity: "opacity-35" },
  { label: "Midground", factor: "0.6×", drift: 190, opacity: "opacity-60" },
  { label: "Foreground", factor: "1.4×", drift: -420, opacity: "opacity-100" },
];

const STACK = [
  "React 19",
  "TanStack Start",
  "Tailwind CSS v4",
  "requestAnimationFrame loop",
  "CSS transform / translate3d",
  "IntersectionObserver",
];

function LearnCard({ card, index, inView }: { card: Card; index: number; inView: boolean }) {
  const Icon = card.icon;
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.06] p-6 md:bg-cream/[0.04] md:backdrop-blur-md",
        "transition-[opacity,transform,border-color,background-color] duration-700 ease-[var(--ease-cinematic)]",
        "hover:-translate-y-1.5 hover:border-ember-soft/40 hover:bg-cream/[0.07] hover:shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)]",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
      style={{ transitionDelay: inView ? `${160 + index * 110}ms` : "0ms" }}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-ember-soft/30 bg-ember/10 text-ember-soft transition-transform duration-500 group-hover:scale-110">
        <Icon size={18} strokeWidth={1.6} />
      </span>
      <h3 className="font-display text-base tracking-[0.14em] text-cream">{card.kicker}</h3>
      {card.body && <p className="text-sm font-light leading-relaxed text-cream/70">{card.body}</p>}
      {card.list && (
        <ul className="flex flex-col gap-2">
          {card.list.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-light text-cream/70">
              <span className="size-1 rounded-full bg-ember-soft/70" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** Live proof of the rule: three tick rails sliding past at different rates. */
function DepthDemo({ inView }: { inView: boolean }) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 transition-[opacity,transform] duration-1000 ease-[var(--ease-cinematic)]",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
      style={{ transitionDelay: inView ? "80ms" : "0ms" }}
    >
      <figcaption className="mb-6 flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ember-soft/70">
          Live demo
        </span>
        <span className="text-sm font-light text-cream/70">
          Keep scrolling — the three rails below share one scroll, at three speeds.
        </span>
      </figcaption>

      <div className="flex flex-col gap-6">
        {PLANES.map((plane) => (
          <div key={plane.label} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-cream/55">
              <span>{plane.label}</span>
              <span className="text-ember-soft">{plane.factor}</span>
            </div>
            <div className="relative h-6 overflow-hidden rounded-full border border-cream/10 bg-ink/60">
              <ParallaxLayer
                speed={0}
                driftX={plane.drift}
                mouse={0}
                className={cn("absolute inset-y-0 -left-[60%] w-[220%]", plane.opacity)}
                style={{
                  background:
                    "repeating-linear-gradient(90deg, var(--ember) 0 2px, transparent 2px 34px)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

/**
 * Educational interlude: what parallax is, how it works, why speed reads as
 * depth, where it is used, and what powers this build.
 */
export function LearnSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <ParallaxSection id="learn" className="flex min-h-[100svh] items-center bg-ink py-28">
      <ParallaxLayer speed={0.05} mouse={6} className="absolute inset-x-0 top-[8%] h-[30%]">
        <div className="animate-haze-slow h-full w-full bg-[radial-gradient(60%_100%_at_50%_50%,var(--haze)_0%,transparent_70%)] opacity-30" />
      </ParallaxLayer>

      <div ref={ref} className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div
          className={cn(
            "mb-14 flex flex-col items-center text-center transition-[opacity,transform] duration-1000 ease-[var(--ease-cinematic)]",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ember-soft/70">
            Field Notes
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-[0.04em] text-cream md:text-6xl">
            THE CRAFT BEHIND THE DEPTH
          </h2>
          <p className="mt-5 max-w-[52ch] text-sm font-light text-cream/65">
            Everything in this journey is drawn with code — no photographs, no video.
            Here is the idea it is built on.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <DepthDemo inView={inView} />
          <div className="grid gap-5 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <LearnCard key={card.kicker} card={card} index={i} inView={inView} />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-4 transition-[opacity,transform] duration-1000 ease-[var(--ease-cinematic)] sm:flex-row sm:justify-center",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
          style={{ transitionDelay: inView ? "680ms" : "0ms" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cream/45">
            Built with
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-full border border-cream/12 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/70 transition-colors duration-300 hover:border-ember-soft/40 hover:text-cream"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SceneEdges />
    </ParallaxSection>
  );
}
