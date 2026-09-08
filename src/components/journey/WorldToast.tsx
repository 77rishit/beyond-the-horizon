import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useJourney, WORLDS } from "@/components/journey/journey";

/** Small, quiet "world discovered" note that fades in and away. */
export function WorldToast() {
  const { lastDiscovered, clearToast } = useJourney();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!lastDiscovered) return;
    setShown(true);
    const hide = window.setTimeout(() => setShown(false), 2600);
    const clear = window.setTimeout(clearToast, 3200);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(clear);
    };
  }, [lastDiscovered, clearToast]);

  if (!lastDiscovered) return null;

  const index = WORLDS.findIndex((w) => w.id === lastDiscovered.id) + 1;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2",
        "transition-[opacity,transform] duration-700 ease-[var(--ease-cinematic)]",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div className="glass-panel flex items-center gap-3 rounded-full border border-cream/15 px-5 py-2.5">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="absolute inset-0 animate-ping rounded-full bg-ember/60" />
          <span className="relative h-full w-full rounded-full bg-ember" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cream/60">
          World discovered
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream">
          {String(index).padStart(2, "0")} {lastDiscovered.label}
        </span>
      </div>
    </div>
  );
}
