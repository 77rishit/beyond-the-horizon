import { useInView } from "@/components/parallax/useInView";
import { cn } from "@/lib/utils";

type SceneCopyProps = {
  index: string;
  title: string;
  line: string;
  /** Accent color class for the chapter label, e.g. "text-neon-cyan". */
  accentClassName?: string;
  className?: string;
};

/** Scroll-triggered chapter copy: label, headline and one line, revealed in sequence. */
export function SceneCopy({ index, title, line, accentClassName, className }: SceneCopyProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  const step = (delay: number) =>
    cn(
      "transition-[opacity,transform] duration-1000 ease-[var(--ease-cinematic)]",
      inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
    ) + ` [transition-delay:${delay}ms]`;

  return (
    <div ref={ref} className={cn("flex flex-col items-center text-center", className)}>
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.45em]",
          accentClassName ?? "text-ember-soft/70",
          step(0),
        )}
        style={{ transitionDelay: "0ms" }}
      >
        {index}
      </span>
      <h2
        className={cn(
          "mt-5 font-display text-[13vw] leading-[0.88] tracking-[0.04em] text-cream md:text-[7vw]",
          step(160),
        )}
        style={{ transitionDelay: "160ms" }}
      >
        {title}
      </h2>
      <p
        className={cn("mt-5 max-w-[38ch] text-sm font-light text-cream/70 md:text-base", step(340))}
        style={{ transitionDelay: "340ms" }}
      >
        {line}
      </p>
    </div>
  );
}
