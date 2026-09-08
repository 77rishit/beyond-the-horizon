import { useEffect, useState } from "react";

/**
 * Lightweight opening curtain: wordmark + a single progress line, then the
 * panel wipes upward to reveal the hero. Pure CSS, no assets.
 */
export function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const a = window.setTimeout(() => setLeaving(true), 1350);
    return () => {
      window.clearTimeout(a);
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
      <span className="mt-6 block h-px w-40 origin-left bg-cream/15 md:w-64">
        <span className="animate-loader-line block h-px w-full origin-left bg-ember" />
      </span>
      <span className="mt-5 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/40">
        Entering the horizon
      </span>
    </div>
  );
}
