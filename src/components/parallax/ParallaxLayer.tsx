import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollY } from "./useScrollY";

type ParallaxLayerProps = {
  /** 0 = pinned to page, 1 = moves a full viewport-scroll with the page. */
  speed?: number;
  /** Optional additional scale applied as the page scrolls. */
  zoom?: number;
  /** Fade the layer out over this many pixels of scroll. */
  fadeOver?: number;
  /** Mirror the layer horizontally. */
  flipX?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * A single depth plane. Compose several with different `speed` values
 * inside a ParallaxSection to build a scene.
 */
export function ParallaxLayer({
  speed = 0.2,
  zoom = 0,
  fadeOver,
  flipX = false,
  className,
  style,
  children,
}: ParallaxLayerProps) {
  const scrollY = useScrollY();
  const offset = scrollY * speed;
  const scale = 1 + (scrollY / 1000) * zoom;
  const opacity =
    fadeOver && fadeOver > 0 ? Math.max(0, 1 - scrollY / fadeOver) : undefined;

  return (
    <div
      aria-hidden={children ? undefined : true}
      className={cn("will-change-transform", className)}
      style={{
        ...style,
        opacity,
        transform: `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${(flipX ? -scale : scale).toFixed(4)}, ${scale.toFixed(4)})`,
      }}
    >
      {children}
    </div>
  );
}
