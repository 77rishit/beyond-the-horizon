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
    body: "Parallax scrolling is a web design technique where visual elements move at different speeds while scrolling, creating an illusion of depth.",
  },
  {
    icon: MousePointer2,
    kicker: "How does it work?",
    body: "Multiple visual layers are positioned at different distances. Changing their movement speed relative to the scroll creates depth.",
  },
  {
    icon: Sparkles,
    kicker: "Why use it?",
    body: "Parallax can improve visual storytelling, guide user attention and make a webpage feel more immersive.",
  },
  {
    icon: Globe2,
    kicker: "Real-world uses",
    list: [
      "Interactive storytelling",
      "Product websites",
      "Portfolio websites",
      "Digital campaigns",
      "Game-inspired interfaces",
    ],
  },
];

function LearnCard({ card, index, inView }: { card: Card; index: number; inView: boolean }) {
  const Icon = card.icon;
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-md",
        "transition-[opacity,transform,border-color,background-color] duration-700 ease-[var(--ease-cinematic)]",
        "hover:-translate-y-1.5 hover:border-ember-soft/40 hover:bg-cream/[0.07] hover:shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)]",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
      style={{ transitionDelay: inView ? `${index * 110}ms` : "0ms" }}
    >
      {/* light sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-ember-soft/30 bg-ember/10 text-ember-soft transition-transform duration-500 group-hover:scale-110">
        <Icon size={18} strokeWidth={1.6} />
      </span>
      <h3 className="font-display text-lg tracking-[0.14em] text-cream">{card.kicker}</h3>
      {card.body && <p className="text-sm font-light leading-relaxed text-cream/65">{card.body}</p>}
      {card.list && (
        <ul className="flex flex-col gap-2">
          {card.list.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-light text-cream/65">
              <span className="size-1 rounded-full bg-ember-soft/70" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/**
 * Quiet educational interlude: four glass cards explaining parallax,
 * revealed in sequence as they enter the viewport.
 */
export function LearnSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <ParallaxSection id="learn" className="flex min-h-[100svh] items-center bg-ink py-24">
      {/* faint drifting haze so the section still belongs to the journey */}
      <ParallaxLayer speed={0.05} mouse={6} className="absolute inset-x-0 top-[8%] h-[30%]">
        <div className="animate-haze-slow h-full w-full bg-[radial-gradient(60%_100%_at_50%_50%,var(--haze)_0%,transparent_70%)] opacity-30" />
      </ParallaxLayer>

      <div ref={ref} className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10">
        <div
          className={cn(
            "mb-12 flex flex-col items-center text-center transition-[opacity,transform] duration-1000 ease-[var(--ease-cinematic)]",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ember-soft/70">
            Field Notes
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-[0.04em] text-cream md:text-6xl">
            THE CRAFT BEHIND THE DEPTH
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <LearnCard key={card.kicker} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <SceneEdges />
    </ParallaxSection>
  );
}
