import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Journey", href: "#journey" },
  { label: "City", href: "#city" },
  { label: "Ocean", href: "#ocean" },
  { label: "Space", href: "#space" },
];

export function SiteNav() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 transition-all duration-700 ease-[var(--ease-cinematic)] md:px-12",
        lifted ? "glass-panel py-3 md:py-4" : "py-5 md:py-7",
      )}
    >
      <a
        href="#top"
        className="animate-rise group truncate font-display text-xl tracking-[0.3em] text-cream transition-colors duration-500 hover:text-ember-soft md:text-2xl"
      >
        BEYOND
      </a>
      <nav className="flex shrink-0 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:gap-9 sm:text-[11px] sm:tracking-[0.28em]">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative py-1 transition-colors duration-300 hover:text-cream after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-ember after:transition-transform after:duration-500 after:ease-[var(--ease-cinematic)] hover:after:origin-left hover:after:scale-x-100"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
