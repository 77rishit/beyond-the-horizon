import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CinematicButtonProps = {
  href: string;
  children: ReactNode;
  arrow?: "right" | "up";
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Shared call to action: hairline frame, light sweep on hover, press feedback.
 */
export function CinematicButton({
  href,
  children,
  arrow = "right",
  className,
  onClick,
}: CinematicButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden border border-cream/25 bg-ink/25 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cream backdrop-blur-sm",
        "transition-all duration-500 ease-[var(--ease-cinematic)]",
        "hover:-translate-y-0.5 hover:border-ember hover:text-ember-soft hover:shadow-[0_18px_45px_-22px_oklch(0.775_0.115_62/0.85)]",
        "active:translate-y-0 active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ember",
        "sm:px-8 sm:text-[11px] sm:tracking-[0.3em]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-cream/12 opacity-0 transition-opacity duration-200 group-hover:animate-shine group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className={cn(
          "relative transition-transform duration-500 ease-[var(--ease-cinematic)]",
          arrow === "right" ? "group-hover:translate-x-1.5" : "group-hover:-translate-y-1",
        )}
      >
        {arrow === "right" ? "\u2192" : "\u2191"}
      </span>
    </a>
  );
}
