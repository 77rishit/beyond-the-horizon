import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { registerLayer } from "./parallaxEngine";

/** Depth Mode presets: distance decides softness, inertia and pointer drift. */
export type Depth = "background" | "midground" | "foreground";

const DEPTH: Record<Depth, { blur: number; inertia: number; mouse: number }> = {
  // far away: heavy and floaty (softness is opted into per layer, since a
  // full-screen filter is the single most expensive thing we can paint)
  background: { blur: 0, inertia: 0.055, mouse: 8 },
  // middle distance: balanced
  midground: { blur: 0, inertia: 0.1, mouse: 22 },
  // close to camera: sharp and responsive
  foreground: { blur: 0, inertia: 0.2, mouse: 46 },
};

type ParallaxLayerProps = {
  /** Vertical scroll factor. >0 = distant, 0 = locked to page, <0 = foreground (fastest). */
  speed?: number;
  /** Depth Mode preset — sets blur, inertia and pointer drift in one go. */
  depth?: Depth;
  /** Horizontal drift in px per 1000px of scroll. */
  driftX?: number;
  /** Rotation in degrees per 1000px of scroll — for floating objects. */
  rotate?: number;
  /** Extra scale added per 1000px of scroll. */
  zoom?: number;
  /** Fade the layer out over this many pixels of scroll. */
  fadeOver?: number;
  /** Mirror the layer horizontally. */
  flipX?: boolean;
  /** Pixels of pointer-driven drift on desktop. Bigger = closer to camera. */
  mouse?: number;
  /** Depth-of-field blur in px; overrides the depth preset. */
  blur?: number;
  /** Inertia 0.03 (floaty) → 0.3 (tight); overrides the depth preset. */
  inertia?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * A single depth plane. Compose several with different `speed` / `depth`
 * values inside a ParallaxSection to build a scene.
 */
export function ParallaxLayer({
  speed = 0.2,
  depth,
  driftX = 0,
  rotate = 0,
  zoom = 0,
  fadeOver = 0,
  flipX = false,
  mouse,
  blur,
  inertia,
  className,
  style,
  children,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const preset = DEPTH[depth ?? "midground"];
  const resolvedMouse = mouse ?? (depth ? preset.mouse : 0);
  const resolvedBlur = blur ?? (depth ? preset.blur : 0);
  const resolvedInertia = inertia ?? preset.inertia;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerLayer(el, {
      speed,
      driftX,
      rotate,
      zoom,
      fadeOver,
      flipX,
      mouse: resolvedMouse,
      blur: resolvedBlur,
      inertia: resolvedInertia,
    });
  }, [speed, driftX, rotate, zoom, fadeOver, flipX, resolvedMouse, resolvedBlur, resolvedInertia]);

  return (
    <div ref={ref} aria-hidden={children ? undefined : true} className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
}
