import { useEffect, useState } from "react";

/**
 * Opening curtain: wordmark plus three stacked lines that fill at different
 * speeds — the whole idea of the site stated in under two seconds.
 */
const BARS = [
  { label: "Background", delay: "0s", duration: "1.5s", width: "w-24 md:w-40" },
  { label: "Midground", delay: "0.08s", duration: "1.05s", width: "w-32 md:w-52" },
  { label: "Foreground", delay: "0.16s", duration: "0.7s", width: "w-40 md:w-64" },
];

export function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const a = window.setTimeout(() => setLeaving(true), 1100);
    const b = window.setTimeout(() => {
      setGone(true);
      document.body.style.overflow = "";
    }, 2000);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink ${
        leaving ? "animate-loader-out" : ""
      }`}
      onAnimationEnd={(event) => {
        if (event.animationName.startsWith("loader-out")) {
          setGone(true);
          document.body.style.overflow = "";
        }
      }}
    >
      <span className="font-display text-3xl tracking-[0.55em] text-cream md:text-5xl">
        BEYOND
      </span>

      <div className="mt-8 flex flex-col items-center gap-2.5">
        {BARS.map((bar) => (
          <span key={bar.label} className={`relative block h-px ${bar.width} bg-cream/12`}>
            <span
              className="animate-loader-line absolute inset-0 block h-px origin-left bg-ember"
              style={{ animationDelay: bar.delay, animationDuration: bar.duration }}
            />
          </span>
        ))}
      </div>

      <span className="mt-6 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/60">
        Layering depth
      </span>
    </div>
  );
}
