/**
 * Tiny rAF parallax engine.
 *
 * Layers register a DOM node + depth config once; the engine writes
 * `transform` / `opacity` directly on a single animation frame. Nothing
 * re-renders React during scroll, and only compositor-friendly properties
 * are touched, so the scene stays at 60fps.
 */

export type LayerConfig = {
  /** Vertical scroll factor. >0 = distant (lags behind), <0 = foreground (races ahead). */
  speed: number;
  /** Extra scale added per 1000px of scroll. */
  zoom: number;
  /** Fade to 0 over this many pixels of scroll. */
  fadeOver: number;
  /** Mirror horizontally. */
  flipX: boolean;
  /** Pixels of pointer-driven drift (desktop only). */
  mouse: number;
};

type Layer = LayerConfig & { el: HTMLElement };

const layers = new Set<Layer>();

let scrollY = 0;
let pointerX = 0;
let pointerY = 0;
let smoothX = 0;
let smoothY = 0;
let frame = 0;
let started = false;
let pointerEnabled = false;

function render() {
  frame = 0;

  smoothX += (pointerX - smoothX) * 0.08;
  smoothY += (pointerY - smoothY) * 0.08;

  for (const layer of layers) {
    const y = scrollY * layer.speed + smoothY * layer.mouse;
    const x = smoothX * layer.mouse;
    const scale = 1 + (scrollY / 1000) * layer.zoom;
    const sx = layer.flipX ? -scale : scale;

    layer.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${sx.toFixed(4)}, ${scale.toFixed(4)})`;

    if (layer.fadeOver > 0) {
      layer.el.style.opacity = String(Math.max(0, 1 - scrollY / layer.fadeOver));
    }
  }

  // keep easing the pointer until it settles
  if (Math.abs(pointerX - smoothX) > 0.0005 || Math.abs(pointerY - smoothY) > 0.0005) {
    schedule();
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(render);
}

function onScroll() {
  scrollY = window.scrollY;
  schedule();
}

function onPointerMove(event: PointerEvent) {
  if (!pointerEnabled) return;
  pointerX = event.clientX / window.innerWidth - 0.5;
  pointerY = event.clientY / window.innerHeight - 0.5;
  schedule();
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  pointerEnabled =
    !reduced && window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;

  scrollY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  schedule();
}

export function registerLayer(el: HTMLElement, config: LayerConfig) {
  const layer: Layer = { el, ...config };
  layers.add(layer);
  start();
  schedule();
  return () => {
    layers.delete(layer);
  };
}
