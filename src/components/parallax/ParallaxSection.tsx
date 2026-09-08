import { useEffect, useRef, type ReactNode } from "react";
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

/** Pauses a stage's ambient animations while it is far off screen. */
function useStageVisibility() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Stage for one parallax chapter. Depth planes inside are clipped to the
 * stage; with `scrollLength` the stage pins to the viewport so the layers
 * have room to separate. Add more of these to extend the experience.
 */
export function ParallaxSection({ id, className, children, scrollLength }: ParallaxSectionProps) {
  const ref = useStageVisibility();

  if (!scrollLength) {
    return (
      <section
        ref={ref}
        data-parallax-stage=""
        id={id}
        className={cn("relative min-h-[100svh] w-full overflow-hidden", className)}
      >
        {children}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      data-parallax-stage=""
      id={id}
      className={cn("relative w-full", className)}
      style={{ height: scrollLength }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">{children}</div>
    </section>
  );
}
