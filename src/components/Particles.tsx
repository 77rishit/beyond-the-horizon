import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";

const dots = Array.from({ length: 22 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const b = Math.abs(Math.sin(i * 78.233) * 12345.6789) % 1;
  return {
    left: `${(a * 100).toFixed(2)}%`,
    top: `${(b * 100).toFixed(2)}%`,
    size: Number((1.5 + b * 3).toFixed(2)),
    duration: Number((16 + a * 16).toFixed(2)),
    delay: Number((-a * 20).toFixed(2)),
    opacity: Number((0.18 + b * 0.35).toFixed(2)),
  };
});

/** Ambient dust drifting over every scene; drifts with the pointer on desktop. */
export function Particles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <ParallaxLayer speed={0} mouse={26} className="absolute inset-0">
        {dots.map((d, i) => (
          <span
            key={i}
            className={
              // Phones carry a lighter dust count — same feel, fewer painted layers.
              `animate-particle absolute rounded-full bg-cream${i >= 12 ? " hidden md:block" : ""}`
            }
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              ["--particle-opacity" as string]: d.opacity,
            }}
          />
        ))}
      </ParallaxLayer>
    </div>
  );
}
