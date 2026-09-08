import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { registerLayer } from "./parallaxEngine";

type ParallaxLayerProps = {
  /** Vertical scroll factor. >0 = distant, 0 = locked to page, <0 = foreground (fastest). */
  speed?: number;
  /** Extra scale added per 1000px of scroll. */
  zoom?: number;
  /** Fade the layer out over this many pixels of scroll. */
  fadeOver?: number;
  /** Mirror the layer horizontally. */
  flipX?: boolean;
  /** Pixels of pointer-driven drift on desktop. Bigger = closer to camera. */
  mouse?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * A single depth plane. Compose several with different `speed` / `mouse`
 * values inside a ParallaxSection to build a scene.
 */
export function ParallaxLayer({
  speed = 0.2,
  zoom = 0,
  fadeOver = 0,
  flipX = false,
  mouse = 0,
  className,
  style,
  children,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerLayer(el, { speed, zoom, fadeOver, flipX, mouse });
  }, [speed, zoom, fadeOver, flipX, mouse]);

  return (
    <div
      ref={ref}
      aria-hidden={children ? undefined : true}
      className={cn("will-change-transform", className)}
      style={{ ...style, transform: flipX ? "scaleX(-1)" : undefined }}
    >
      {children}
    </div>
  );
}
