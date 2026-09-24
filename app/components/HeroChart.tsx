"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RANGES = ["1W", "1M", "3M", "1Y", "MISSION"];

type Callout = {
  x: number;
  y: number;
  align: "left" | "right";
  lines: string[];
};

const CALLOUTS: Callout[] = [
  {
    x: 300,
    y: 108,
    align: "left",
    lines: ["EXTRACELLULAR FLUID DETECTED (+2.8 LBS)", "DRY TISSUE MASS STABLE"],
  },
  {
    x: 470,
    y: 214,
    align: "right",
    lines: ["FLUID-DECOUPLED TRUE DRY MASS: 183.1 LBS", "ON FLIGHT PATH"],
  },
  {
    x: 792,
    y: 268,
    align: "left",
    lines: ["PRESCRIBED TOUCHDOWN RUNWAY: NOV 15", "170.0 LBS"],
  },
];

// Historical verified path (gold dry-mass line), left of TODAY (x=430)
const GOLD_HISTORY = "M 40,150 C 110,158 150,170 210,178 C 260,184 300,196 350,206 C 390,214 410,218 430,222";
// Future corridor centerline continuation (still solid gold, current trajectory)
const GOLD_FUTURE = "M 430,222 C 520,236 600,248 680,258 C 730,264 770,268 800,270";
// Dashed prescribed target vector, diverges slightly below actual
const TARGET_VECTOR = "M 430,222 C 520,244 610,272 700,296 C 740,306 770,312 800,316";
// Raw scale white dots with cyan translucent band (water-weight noise) — only in historical zone
const RAW_SCALE_POINTS = [
  [60, 146], [95, 130], [130, 168], [165, 150], [200, 190], [235, 172],
  [270, 210], [305, 188], [340, 224], [375, 200], [405, 232],
];

export default function HeroChart() {
  const [activeRange, setActiveRange] = useState(4);
  const [calloutIndex, setCalloutIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCalloutIndex((i) => (i + 1) % CALLOUTS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const callout = CALLOUTS[calloutIndex];

  return (
    <div className="no-select overflow-hidden rounded-md border hairline bg-slate-deep/60 shadow-instrument">
      {/* Header bar */}
      <div className="flex flex-col gap-3 border-b hairline px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-1 rounded-sm border hairline bg-obsidian/60 p-1">
          {RANGES.map((r, i) => (
            <button
              key={r}
              onClick={() => setActiveRange(i)}
              className={`rounded-[2px] px-2.5 py-1 text-[10px] font-medium tracking-wide transition-colors sm:px-3 ${
                i === activeRange
                  ? "bg-gold text-obsidian"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="font-mono text-[10px] tracking-wide text-white/45 tabular-nums">
          MISSION SPAN: JUN 01 → NOV 15 · WEEK 16 OF 24 (66% ELAPSED)
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <svg
          viewBox="0 0 900 380"
          className="h-auto w-full"
          role="img"
          aria-label="Animated chart showing dry tissue mass tracking below a target descent line, with water-weight spikes shown separately from true mass"
        >
          <defs>
            <linearGradient id="futureShade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cyanBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[70, 140, 210, 280, 340].map((y) => (
            <line key={y} x1="40" y1={y} x2="860" y2={y} stroke="#1B3152" strokeWidth="1" />
          ))}

          {/* future corridor shading */}
          <rect x="430" y="30" width="430" height="320" fill="url(#futureShade)" />

          {/* cyan translucent band under raw scale noise */}
          <path
            d="M 60,150 L 95,130 L 130,168 L 165,150 L 200,190 L 235,172 L 270,210 L 305,188 L 340,224 L 375,200 L 405,232 L 405,240 L 60,240 Z"
            fill="url(#cyanBand)"
          />

          {/* raw scale white dots connected by thin line */}
          <polyline
            points={RAW_SCALE_POINTS.map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          {RAW_SCALE_POINTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#FFFFFF" fillOpacity="0.85" />
          ))}

          {/* dashed prescribed target vector */}
          <path
            d={TARGET_VECTOR}
            fill="none"
            stroke="#E7D9A8"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeOpacity="0.75"
          />

          {/* solid gold dry-mass line: history + future */}
          <path d={GOLD_HISTORY} fill="none" stroke="#D4AF37" strokeWidth="3" className="gold-glow" />
          <path d={GOLD_FUTURE} fill="none" stroke="#D4AF37" strokeWidth="3" strokeOpacity="0.9" className="gold-glow" />

          {/* TODAY line */}
          <line x1="430" y1="30" x2="430" y2="350" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 4" />
          <text x="434" y="44" className="font-mono" fontSize="10" fill="#FFFFFF" fillOpacity="0.55">
            TODAY
          </text>

          {/* variance badge near current point */}
          <g transform="translate(430,222)">
            <circle r="4" fill="#D4AF37" />
            <rect x="10" y="-11" width="52" height="18" rx="2" fill="#0B1528" stroke="#2A3B5C" />
            <text x="16" y="2" className="font-mono" fontSize="9" fill="#D4AF37">
              +0.8 LBS
            </text>
          </g>

          {/* target waypoint */}
          <g transform="translate(800,316)">
            <text fontSize="15" fill="#D4AF37" x="-6" y="5">
              ⌖
            </text>
          </g>

          {/* animated callouts */}
          <AnimatePresence mode="wait">
            <motion.g
              key={calloutIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
            >
              <line
                x1={callout.x}
                y1={callout.y}
                x2={callout.x}
                y2={callout.y - 28}
                stroke="#D4AF37"
                strokeOpacity="0.6"
                strokeWidth="1"
              />
              <foreignObject
                x={callout.align === "left" ? callout.x - 4 : callout.x - 240}
                y={callout.y - 78}
                width="244"
                height="52"
              >
                <div className="font-mono text-[9px] leading-snug tracking-wide text-gold/90">
                  {callout.lines.map((l, i) => (
                    <div key={i} className={i === 0 ? "text-white/80" : "text-gold"}>
                      {l}
                    </div>
                  ))}
                </div>
              </foreignObject>
            </motion.g>
          </AnimatePresence>
        </svg>
      </div>

      <div className="flex items-center gap-6 border-t hairline px-5 py-3 text-[10px] text-white/45">
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-3 bg-gold" /> Dry tissue mass
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Raw scale reading
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-3 border-t border-dashed border-[#E7D9A8]" /> Prescribed path
        </span>
      </div>
    </div>
  );
}
