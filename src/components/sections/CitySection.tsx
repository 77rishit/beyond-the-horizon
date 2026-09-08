import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { ParallaxSection } from "@/components/parallax/ParallaxSection";
import { SceneCopy } from "@/components/sections/SceneCopy";
import { SceneEdges } from "@/components/SceneEdges";

type Building = { left: number; width: number; height: number; lit: number };

function makeSkyline(seed: number, count: number, maxHeight: number): Building[] {
  const out: Building[] = [];
  let x = -4;
  for (let i = 0; i < count; i++) {
    const n = Math.abs(Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
    const m = Math.abs(Math.sin(seed + i * 78.233) * 12345.6789) % 1;
    const width = Number((3 + n * 6).toFixed(3));
    out.push({
      left: Number(x.toFixed(3)),
      width: Number(width.toFixed(3)),
      height: Number((maxHeight * (0.35 + m * 0.65)).toFixed(3)),
      lit: Math.round(n * 6) + 3,
    });
    x += width + 0.6 + n * 2.2;
    if (x > 104) break;
  }
  return out;
}

function Skyline({
  buildings,
  colorClass,
  windowClass,
  windowOpacity,
}: {
  buildings: Building[];
  colorClass: string;
  windowClass: string;
  windowOpacity: number;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-full">
      {buildings.map((b, i) => (
        <div
          key={i}
          className={`absolute bottom-0 ${colorClass}`}
          style={{ left: `${b.left}%`, width: `${b.width}%`, height: `${b.height}%` }}
        >
          <div className="grid h-full grid-cols-3 content-start gap-[2px] p-[3px]">
            {Array.from({ length: b.lit * 3 }).map((_, w) => (
              <span
                key={w}
                className={`h-[3px] ${windowClass}`}
                style={{ opacity: (w * 7) % 5 === 0 ? windowOpacity : windowOpacity * 0.25 }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlyingVehicle({
  top,
  duration,
  delay,
  scale,
  reverse,
}: {
  top: string;
  duration: number;
  delay: number;
  scale: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="animate-fly absolute"
      style={{
        top,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationDirection: reverse ? "reverse" : "normal",
        transform: `scale(${scale})`,
      }}
    >
      <div className="relative h-[3px] w-16 rounded-full bg-neon-cyan/80 shadow-[0_0_18px_4px_oklch(0.86_0.13_200/0.5)]">
        <span className="absolute -left-14 top-[1px] h-px w-14 bg-gradient-to-l from-neon-cyan/60 to-transparent" />
        <span className="absolute -bottom-1 right-2 h-1 w-1 rounded-full bg-neon-magenta shadow-[0_0_10px_3px_oklch(0.72_0.2_340/0.6)]" />
      </div>
    </div>
  );
}

export function CitySection() {
  const far = makeSkyline(1.7, 26, 58);
  const mid = makeSkyline(4.2, 20, 74);
  const near = makeSkyline(9.1, 14, 92);

  return (
    <ParallaxSection id="city" className="bg-ink" scrollLength="220vh">
      {/* BACKGROUND — neon sky */}
      <ParallaxLayer
        speed={0.42}
        zoom={0.06}
        mouse={4}
        className="bg-city-sky absolute inset-x-0 -top-1/2 h-[200%]"
      />
      <ParallaxLayer speed={0.36} mouse={8} className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-[18%] top-[46%] h-[46vh] w-[46vh] -translate-x-1/2 rounded-full bg-neon-magenta/20 blur-[90px]" />
        <div className="animate-glow-pulse absolute right-[12%] top-[38%] h-[38vh] w-[38vh] rounded-full bg-neon-cyan/15 blur-[90px]" />
      </ParallaxLayer>

      {/* BACKGROUND buildings — slowest */}
      <ParallaxLayer
        speed={0.3}
        mouse={10}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-60"
      >
        <Skyline
          buildings={far}
          colorClass="bg-city-far"
          windowClass="bg-neon-cyan"
          windowOpacity={0.35}
        />
      </ParallaxLayer>

      {/* MIDGROUND — flying vehicles + mid towers */}
      <ParallaxLayer speed={0.12} mouse={22} className="pointer-events-none absolute inset-0">
        <FlyingVehicle top="26%" duration={17} delay={0} scale={0.7} />
        <FlyingVehicle top="38%" duration={23} delay={5} scale={0.5} reverse />
        <FlyingVehicle top="18%" duration={29} delay={11} scale={0.4} />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.02}
        mouse={30}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[74%]"
      >
        <Skyline
          buildings={mid}
          colorClass="bg-city-mid"
          windowClass="bg-neon-magenta"
          windowOpacity={0.55}
        />
      </ParallaxLayer>

      {/* FOREGROUND — nearest towers, fastest */}
      <ParallaxLayer
        speed={-0.2}
        mouse={52}
        className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-[86%]"
      >
        <Skyline
          buildings={near}
          colorClass="bg-city-front"
          windowClass="bg-neon-cyan"
          windowOpacity={0.5}
        />
        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-city-front" />
      </ParallaxLayer>

      <ParallaxLayer
        speed={0.16}
        mouse={16}
        className="relative z-20 mx-auto flex h-full max-w-4xl items-center justify-center px-6"
      >
        <SceneCopy
          index="02 — City"
          title="THE CITY NEVER STOPS"
          line="A million lit windows, and not one of them sleeps."
          accentClassName="text-neon-cyan/80"
        />
      </ParallaxLayer>

      <SceneEdges />
    </ParallaxSection>
  );
}
