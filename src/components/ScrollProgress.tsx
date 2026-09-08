import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { STAGES, WORLDS, useJourney } from "@/components/journey/journey";

/** Vertical journey rail: start → four worlds → finish, with a scroll-driven progress line. */
export function ScrollProgress() {
  const { activeIndex, discovered, worldsFound } = useJourney();
  const barRef = useRef<HTMLSpanElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      if (topRef.current) topRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeStage = STAGES[activeIndex];
  const activeWorld = activeStage?.world
    ? WORLDS.findIndex((w) => w.id === activeStage.id) + 1
    : worldsFound;

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-cream/10"
      >
        <span
          ref={topRef}
          className="block h-full w-full origin-left bg-gradient-to-r from-ember-soft to-ember"
          style={{ transform: "scaleX(0)" }}
        />
      </span>

      <nav
        aria-label="Journey progress"
        className="fixed right-4 top-1/2 z-40 -translate-y-1/2 md:right-8"
      >
        <span className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-cream/15" />
        <span
          ref={barRef}
          aria-hidden
          className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-ember"
          style={{ transform: "scaleY(0)" }}
        />

        <ul className="relative flex flex-col gap-7">
          {STAGES.map((stage, i) => {
            const isActive = activeIndex === i;
            const found = discovered.has(stage.id);
            return (
              <li key={stage.id}>
                <a
                  href={`#${stage.id}`}
                  aria-label={stage.num ? `${stage.num} ${stage.label}` : stage.label}
                  className="group flex min-h-11 items-center gap-3 py-1"
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "relative h-[11px] w-[11px] shrink-0 rounded-full border transition-all duration-500",
                      isActive
                        ? "scale-110 border-ember bg-ember shadow-[0_0_14px_3px_oklch(0.775_0.115_62/0.45)]"
                        : found
                          ? "border-ember/60 bg-ember/40"
                          : stage.world
                            ? "border-cream/30 bg-ink/60 group-hover:border-cream/70"
                            : "border-cream/25 bg-ink/60 group-hover:border-cream/60",
                    )}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -inset-[3px] animate-ping rounded-full border border-ember/50"
                      />
                    )}
                  </span>

                  <span aria-hidden className="hidden flex-col md:flex">
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500",
                        isActive
                          ? "text-cream opacity-100"
                          : found
                            ? "text-cream/65 opacity-90"
                            : "text-cream/60 opacity-90",
                      )}
                    >
                      {stage.num ? `${stage.num} ${stage.label}` : stage.label}
                    </span>
                    {/* Quiet detail: the note only surfaces on hover, once found. */}
                    <span
                      className={cn(
                        "max-w-[16ch] overflow-hidden text-[10px] font-light leading-tight text-cream/60",
                        "max-h-0 opacity-0 transition-all duration-500 ease-[var(--ease-cinematic)]",
                        found &&
                          "group-hover:mt-1 group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:mt-1 group-focus-visible:max-h-8 group-focus-visible:opacity-100",
                      )}
                    >
                      {stage.note}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 hidden md:block">
          <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
            World {String(Math.max(activeWorld, 0)).padStart(2, "0")}{" "}
            <span className="text-cream/50">/ {String(WORLDS.length).padStart(2, "0")}</span>
          </span>
          <span className="mt-2 flex gap-1.5">
            {WORLDS.map((w) => (
              <span
                key={w.id}
                className={cn(
                  "h-px w-4 transition-all duration-700",
                  discovered.has(w.id) ? "bg-ember" : "bg-cream/20",
                )}
              />
            ))}
          </span>
        </div>
      </nav>
    </>
  );
}
