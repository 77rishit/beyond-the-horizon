import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Stage = {
  id: string;
  num?: string;
  label: string;
  /** Quiet line revealed on hover in the rail — a small thing to find. */
  note?: string;
  world: boolean;
};

export const STAGES: Stage[] = [
  { id: "top", label: "Start", note: "Where the light begins.", world: false },
  {
    id: "journey",
    num: "01",
    label: "Mountains",
    note: "Ridgelines drift slowest of all.",
    world: true,
  },
  { id: "city", num: "02", label: "City", note: "Three depths of glass and neon.", world: true },
  { id: "ocean", num: "03", label: "Ocean", note: "Sound travels further down here.", world: true },
  { id: "space", num: "04", label: "Space", note: "Nothing to push against.", world: true },
  { id: "finale", label: "Finish", note: "The horizon keeps moving.", world: false },
];

export const WORLDS = STAGES.filter((s) => s.world);

type JourneyValue = {
  activeIndex: number;
  discovered: Set<string>;
  /** 0-based index of the most recently discovered world, -1 before any. */
  worldsFound: number;
  lastDiscovered: Stage | null;
  clearToast: () => void;
};

const JourneyContext = createContext<JourneyValue | null>(null);

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside <JourneyProvider>");
  return ctx;
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [discovered, setDiscovered] = useState<Set<string>>(() => new Set());
  const [lastDiscovered, setLastDiscovered] = useState<Stage | null>(null);
  const seen = useRef<Set<string>>(new Set());

  const clearToast = useCallback(() => setLastDiscovered(null), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.55;
      let next = 0;
      STAGES.forEach((stage, i) => {
        const el = document.getElementById(stage.id);
        if (el && el.getBoundingClientRect().top <= mid) next = i;
      });
      setActiveIndex((prev) => (prev === next ? prev : next));

      const stage = STAGES[next];
      if (stage && !seen.current.has(stage.id)) {
        seen.current.add(stage.id);
        setDiscovered(new Set(seen.current));
        if (stage.world) setLastDiscovered(stage);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const worldsFound = useMemo(
    () => WORLDS.filter((w) => discovered.has(w.id)).length,
    [discovered],
  );

  const value = useMemo(
    () => ({ activeIndex, discovered, worldsFound, lastDiscovered, clearToast }),
    [activeIndex, discovered, worldsFound, lastDiscovered, clearToast],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}
