/**
 * Cinematic seam between scenes: both stage edges dissolve into the page ink
 * so consecutive worlds read as one continuous descent.
 */
export function SceneEdges() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[22vh]"
        style={{ background: "linear-gradient(to bottom, var(--ink) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[22vh]"
        style={{ background: "linear-gradient(to top, var(--ink) 0%, transparent 100%)" }}
      />
    </>
  );
}
