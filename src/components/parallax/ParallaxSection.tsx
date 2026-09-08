import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxSectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
  /** Full viewport stage by default; set false for shorter chapters. */
  fullscreen?: boolean;
};

/**
 * Stage for one parallax chapter. Add more of these below the hero to
 * extend the experience — each one clips its own depth planes.
 */
export function ParallaxSection({
  id,
  className,
  children,
  fullscreen = true,
}: ParallaxSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        fullscreen && "min-h-[100svh]",
        className,
      )}
    >
      {children}
    </section>
  );
}
