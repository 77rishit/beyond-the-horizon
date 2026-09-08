import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxSectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
  /**
   * Total scroll distance the stage stays pinned for, e.g. "200vh".
   * Omit for a plain one-viewport stage.
   */
  scrollLength?: string;
};

/**
 * Stage for one parallax chapter. Depth planes inside are clipped to the
 * stage; with `scrollLength` the stage pins to the viewport so the layers
 * have room to separate. Add more of these to extend the experience.
 */
export function ParallaxSection({
  id,
  className,
  children,
  scrollLength,
}: ParallaxSectionProps) {
  if (!scrollLength) {
    return (
      <section
        id={id}
        className={cn("relative min-h-[100svh] w-full overflow-hidden", className)}
      >
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={cn("relative w-full", className)} style={{ height: scrollLength }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">{children}</div>
    </section>
  );
}
