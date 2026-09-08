/**
 * Tiny rAF parallax engine.
 *
 * Layers register a DOM node + depth config once; the engine writes
 * `transform` / `opacity` directly on a single animation frame. Nothing
 * re-renders React during scroll, and only compositor-friendly properties
 * are touched, so the scene stays smooth.
 *
 * Every layer eases toward its target with its own inertia factor, so
 * distant planes glide and foreground planes snap — that difference is what
 * reads as depth.
 */

export type LayerConfig = {
  /** Vertical scroll factor. >0 = distant (lags behind), <0 = foreground (races ahead). */
  speed: number;
  /** Horizontal drift in px per 1000px of scroll. */
  driftX: number;
  /** Rotation in degrees per 1000px of scroll. */
  rotate: number;
  /** Extra scale added per 1000px of scroll. */
  zoom: number;
  /** Fade to 0 over this many pixels of scroll. */
  fadeOver: number;
  /** Mirror horizontally. */
  flipX: boolean;
  /** Pixels of pointer-driven drift (desktop only). */
  mouse: number;
  /** Static depth-of-field blur in px (desktop only). */
  blur: number;
  /** Inertia: 0.03 = heavy and floaty, 0.3 = tight and immediate. */
  inertia: number;
};

type Layer = LayerConfig & {
  el: HTMLElement;
  stage: HTMLElement | null;
  x: number;
  y: number;
  rot: number;
  scale: number;
  primed: boolean;
  hinted: boolean;
};

const layers = new Set<Layer>();

let scrollY = 0;
let pointerX = 0;
let pointerY = 0;
let smoothX = 0;
let smoothY = 0;
let frame = 0;
let started = false;
let pointerEnabled = false;
/** 1 on desktop, reduced on small screens, 0 when the user asks for less motion. */
let motionScale = 1;
let blurEnabled = false;

const EPS = 0.01;

/** Reused between frames so the loop allocates nothing. */
const stageProgress = new Map<HTMLElement, number>();
const stageVisible = new Map<HTMLElement, boolean>();

function render() {
  frame = 0;

  smoothX += (pointerX - smoothX) * 0.07;
  smoothY += (pointerY - smoothY) * 0.07;

  // read phase: how far each stage has been scrolled into, and whether it is
  // anywhere near the viewport (off-screen stages are skipped entirely)
  stageProgress.clear();
  stageVisible.clear();
  const vh = window.innerHeight;
  for (const layer of layers) {
    const stage = layer.stage;
    if (!stage || stageProgress.has(stage)) continue;
    const rect = stage.getBoundingClientRect();
    stageProgress.set(stage, -rect.top);
    stageVisible.set(stage, rect.bottom > -vh * 0.25 && rect.top < vh * 1.25);
  }

  let settling = false;

  for (const layer of layers) {
    const visible = layer.stage ? (stageVisible.get(layer.stage) ?? true) : true;
    if (!visible) {
      // Nothing to paint: drop the compositor hint so idle scenes cost no memory.
      if (layer.hinted) {
        layer.el.style.willChange = "auto";
        layer.hinted = false;
      }
      continue;
    }
    if (!layer.hinted) {
      layer.el.style.willChange = "transform";
      layer.hinted = true;
    }

    const local = layer.stage ? (stageProgress.get(layer.stage) ?? 0) : scrollY;
    const k = local / 1000;

    const targetY = local * layer.speed * motionScale + smoothY * layer.mouse;
    const targetX = k * layer.driftX * motionScale + smoothX * layer.mouse;
    const targetRot = k * layer.rotate * motionScale;
    const targetScale = 1 + k * layer.zoom;

    // Per-layer inertia gives each plane its own easing curve.
    const e = layer.primed ? layer.inertia : 1;
    layer.y += (targetY - layer.y) * e;
    layer.x += (targetX - layer.x) * e;
    layer.rot += (targetRot - layer.rot) * e;
    layer.scale += (targetScale - layer.scale) * e;
    layer.primed = true;

    const sx = layer.flipX ? -layer.scale : layer.scale;
    layer.el.style.transform =
      `translate3d(${layer.x.toFixed(2)}px, ${layer.y.toFixed(2)}px, 0)` +
      (layer.rot !== 0 ? ` rotate(${layer.rot.toFixed(3)}deg)` : "") +
      ` scale(${sx.toFixed(4)}, ${layer.scale.toFixed(4)})`;

    if (layer.fadeOver > 0) {
      layer.el.style.opacity = String(Math.max(0, 1 - Math.max(0, local) / layer.fadeOver));
    }

    if (
      Math.abs(targetY - layer.y) > EPS ||
      Math.abs(targetX - layer.x) > EPS ||
      Math.abs(targetRot - layer.rot) > 0.001 ||
      Math.abs(targetScale - layer.scale) > 0.0005
    ) {
      settling = true;
    }
  }

  // keep easing until pointer drift and every layer have settled
  if (
    settling ||
    Math.abs(pointerX - smoothX) > 0.0005 ||
    Math.abs(pointerY - smoothY) > 0.0005
  ) {
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
  const desktop = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
  const wide = window.matchMedia("(min-width: 768px)").matches;

  pointerEnabled = !reduced && desktop;
  blurEnabled = !reduced && wide;
  motionScale = reduced ? 0 : wide ? 1 : 0.45;

  scrollY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  schedule();
}

export function registerLayer(el: HTMLElement, config: LayerConfig) {
  const stage = el.closest<HTMLElement>("[data-parallax-stage]");
  start();

  const layer: Layer = {
    el,
    stage,
    ...config,
    // pointer drift is desktop-only
    mouse: pointerEnabled ? config.mouse : 0,
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    primed: false,
    hinted: false,
  };

  if (config.blur > 0 && blurEnabled) {
    el.style.filter = `blur(${config.blur}px)`;
  }

  layers.add(layer);
  schedule();
  return () => {
    layers.delete(layer);
    el.style.willChange = "auto";
  };
}
