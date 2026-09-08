import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stops = [
  { id: "journey", num: "01", label: "Journey" },
  { id: "city", num: "02", label: "City" },
  { id: "ocean", num: "03", label: "Ocean" },
  { id: "space", num: "04", label: "Space" },
];

/** Vertical chapter rail with a scroll-driven progress line. */
export function ScrollProgress() {
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;

      const mid = window.innerHeight / 2;
      let next = 0;
      stops.forEach((stop, i) => {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= mid) next = i;
      });
      setActive((prev) => (prev === next ? prev : next));
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

  return (
    <nav
      aria-label="Journey progress"
      className="fixed right-4 top-1/2 z-40 -translate-y-1/2 md:right-8"
    >
      <span className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-cream/15 md:left-[5px]" />
      <span
        ref={barRef}
        aria-hidden
        className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-ember"
        style={{ transform: "scaleY(0)" }}
      />
      <ul className="relative flex flex-col gap-7">
        {stops.map((stop, i) => (
          <li key={stop.id}>
            <a
              href={`#${stop.id}`}
              className="group flex items-center gap-3"
              aria-current={active === i ? "true" : undefined}
            >
              <span
                className={cn(
                  "h-[11px] w-[11px] shrink-0 rounded-full border transition-all duration-500",
                  active === i
                    ? "scale-110 border-ember bg-ember shadow-[0_0_14px_3px_oklch(0.775_0.115_62/0.45)]"
                    : "border-cream/30 bg-ink/60 group-hover:border-cream/70",
                )}
              />
              <span
                className={cn(
                  "hidden font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 md:inline",
                  active === i ? "text-cream opacity-100" : "text-cream/45 opacity-70",
                )}
              >
                {stop.num} {stop.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
