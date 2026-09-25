"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  MISSION_DAYS,
  TODAY,
  DRY_TODAY,
  TARGET_END,
  FLUID_TODAY,
  bandPath,
  buildTelemetry,
  monotonePath,
  smooth,
  targetAt,
} from "@/lib/telemetry";
import { demoSteps } from "@/app/content";

const DURATIONS = [4800, 2800, 3000, 3200, 4400];
const Y_MIN = 166;
const Y_MAX = 210;
const MONTHS: [number, string][] = [
  [0, "Jun"],
  [30, "Jul"],
  [61, "Aug"],
  [92, "Sep"],
  [122, "Oct"],
  [153, "Nov"],
];

function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return compact;
}

export default function DecouplingDemo() {
  const data = useMemo(() => buildTelemetry(), []);
  const compact = useCompact();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35 });
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  useEffect(() => {
    if (reduce) {
      setPhase(4);
      return;
    }
    if (!started || !inView) return;
    const id = setTimeout(() => setPhase((p) => (p + 1) % DURATIONS.length), DURATIONS[phase]);
    return () => clearTimeout(id);
  }, [phase, started, inView, reduce]);

  // ── geometry ───────────────────────────────────────────────
  const G = compact
    ? { vw: 600, vh: 480, l: 48, r: 22, t: 26, b: 38, fs: 17, dot: 3.6 }
    : { vw: 1000, vh: 380, l: 52, r: 30, t: 22, b: 30, fs: 12, dot: 3 };
  const plotW = G.vw - G.l - G.r;
  const plotH = G.vh - G.t - G.b;
  const x = (d: number) => G.l + (d / MISSION_DAYS) * plotW;
  const y = (v: number) => G.t + ((Y_MAX - v) / (Y_MAX - Y_MIN)) * plotH;

  const paths = useMemo(() => {
    const dryPts = data.dry.filter((p) => p.d % 2 === 0 || p.d === TODAY).map((p) => [x(p.d), y(p.v)] as [number, number]);
    const smoothRaw = smooth(data.raw, 0.5);
    const upper = smoothRaw.map((p) => [x(p.d), y(p.v)] as [number, number]);
    const lower = data.raw.map((p) => [x(p.d), y(data.dry[p.d].v)] as [number, number]);
    const forecast: [number, number][] = [];
    const corridorTop: [number, number][] = [];
    const corridorBot: [number, number][] = [];
    for (let d = TODAY; d < MISSION_DAYS; d += 5) {
      const k = (d - TODAY) / (MISSION_DAYS - TODAY);
      forecast.push([x(d), y(targetAt(d) + 0.8 * Math.pow(1 - k, 1.6))]);
      const spread = 0.6 + k * 2.4;
      corridorTop.push([x(d), y(targetAt(d) + spread)]);
      corridorBot.push([x(d), y(targetAt(d) - spread)]);
    }
    const endD = MISSION_DAYS;
    forecast.push([x(endD), y(TARGET_END)]);
    corridorTop.push([x(endD), y(TARGET_END + 3)]);
    corridorBot.push([x(endD), y(TARGET_END - 3)]);
    return {
      gold: monotonePath(dryPts),
      band: bandPath(upper, lower),
      forecast: monotonePath(forecast),
      corridor: bandPath(corridorTop, corridorBot),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, compact]);

  const todayX = x(TODAY);
  const spike = data.raw[data.raw.length - 1];
  const spikeY = y(spike.v);
  const dryY = y(DRY_TODAY);
  const endX = x(MISSION_DAYS);
  const endY = y(TARGET_END);

  const readouts = [
    {
      label: "Scale reading",
      value: phase >= 1 ? data.scaleToday.toFixed(1) : "···",
      note: phase >= 1 ? `▲ ${data.overnightDelta.toFixed(1)} lb overnight` : "Reading weigh-ins",
      tone: phase === 1 ? "text-coral" : "text-steel",
      valueTone: "text-white",
    },
    {
      label: "Water",
      value: phase >= 2 ? FLUID_TODAY.toFixed(1) : "···",
      note: phase >= 2 ? "Temporary, not fat" : "Not yet separated",
      tone: "text-cyan/80",
      valueTone: "text-cyan",
    },
    {
      label: "True dry mass",
      value: phase >= 3 ? DRY_TODAY.toFixed(1) : "···",
      note: phase >= 4 ? "+0.8 lb vs plan, on course" : phase >= 3 ? "Trend intact" : "Awaiting decoupling",
      tone: "text-champagne/80",
      valueTone: "gold-text",
    },
  ];

  return (
    <div ref={wrapRef} className="bezel no-select relative overflow-hidden rounded-[22px] p-3 sm:p-4">
      {/* status strip */}
      <div className="flex items-center justify-between px-2 pb-3 sm:px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-[12px] text-white/70">Mission Control</span>
        </div>
        <div className="flex gap-1 rounded-full border hairline bg-space/60 p-0.5">
          {["1W", "1M", "3M", "1Y", "Mission"].map((r) => (
            <span
              key={r}
              className={`rounded-full px-2 py-0.5 text-[10px] sm:px-2.5 sm:text-[11px] ${
                r === "Mission" ? "bg-gold font-semibold text-obsidian" : "text-white/40"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* readouts */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {readouts.map((r) => (
          <div key={r.label} className="rounded-xl border hairline bg-space/50 px-3 py-2 sm:px-3.5 sm:py-2.5">
            <div className="text-[10.5px] text-white/45 sm:text-[12px]">{r.label}</div>
            <div className="mt-0.5 font-mono text-[20px] font-medium tabular-nums sm:text-[23px]">
              <span className={r.valueTone}>{r.value}</span>
              <span className="ml-1 text-[11px] text-white/35 sm:text-[13px]">lb</span>
            </div>
            <div className={`mt-0.5 truncate text-[10px] sm:text-[11.5px] ${r.tone}`}>{r.note}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mt-3 rounded-xl border hairline bg-space/40">
        <svg
          viewBox={`0 0 ${G.vw} ${G.vh}`}
          className="block h-auto w-full touch-none"
          role="img"
          aria-label="Animated chart: raw scale readings spike 2.8 pounds overnight, Directive separates the spike as water, and reveals a smooth true weight trend on track to reach 170 pounds by November 15."
        >
          <defs>
            <linearGradient id="dd-gold" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#A8862A" />
              <stop offset="0.6" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#F6E7B4" />
            </linearGradient>
            <linearGradient id="dd-cyan" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#38BDF8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="dd-future" x1="0" x2="1">
              <stop offset="0" stopColor="#1B3152" stopOpacity="0.55" />
              <stop offset="1" stopColor="#1B3152" stopOpacity="0.15" />
            </linearGradient>
            <filter id="dd-glow" x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <clipPath id="dd-reveal">
              <motion.rect
                x={0}
                y={0}
                height={G.vh}
                initial={false}
                animate={{
                  width: reduce ? todayX + 12 : !started ? G.l : phase === 0 ? [G.l, todayX + 12] : todayX + 12,
                }}
                transition={{ duration: phase === 0 && started ? 4.2 : 0, ease: "easeInOut" }}
              />
            </clipPath>
          </defs>

          {/* grid */}
          {[170, 180, 190, 200, 210].map((v) => (
            <g key={v}>
              <line x1={G.l} x2={G.vw - G.r} y1={y(v)} y2={y(v)} stroke="#1B3152" strokeOpacity="0.7" />
              <text x={G.l - 8} y={y(v) + G.fs * 0.35} textAnchor="end" fontSize={G.fs} className="font-mono" fill="#9FB1CC" fillOpacity="0.55">
                {v}
              </text>
            </g>
          ))}
          {MONTHS.map(([d, m]) => (
            <text key={m} x={x(d)} y={G.vh - 12} fontSize={G.fs} fill="#9FB1CC" fillOpacity="0.5">
              {m}
            </text>
          ))}

          {/* future region */}
          <rect x={todayX} y={G.t} width={endX - todayX} height={plotH} fill="url(#dd-future)" />
          <line x1={todayX} x2={todayX} y1={G.t - 6} y2={G.t + plotH} stroke="#F1DC9A" strokeOpacity="0.35" strokeDasharray="2 5" />
          <text x={todayX + 6} y={G.t + G.fs * 0.4} fontSize={G.fs} fill="#F1DC9A" fillOpacity="0.7">
            Today
          </text>

          {/* prescribed runway (phase 4) */}
          <motion.g initial={false} animate={{ opacity: phase >= 4 ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <path d={paths.corridor} fill="#D4AF37" fillOpacity="0.13" />
            <line
              x1={x(0)}
              y1={y(targetAt(0))}
              x2={endX}
              y2={endY}
              stroke="#F1DC9A"
              strokeOpacity="0.4"
              strokeWidth={compact ? 2 : 1.5}
              strokeDasharray="6 7"
            />
            <path d={paths.forecast} fill="none" stroke="url(#dd-gold)" strokeWidth={compact ? 3 : 2.5} strokeDasharray="1 7" strokeLinecap="round" />
            <circle cx={endX} cy={endY} r={compact ? 11 : 9} fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <circle cx={endX} cy={endY} r={3} fill="#D4AF37" />
            <line x1={endX - 16} x2={endX + 16} y1={endY} y2={endY} stroke="#D4AF37" strokeOpacity="0.6" />
            <line x1={endX} x2={endX} y1={endY - 16} y2={endY + 16} stroke="#D4AF37" strokeOpacity="0.6" />
            <text x={endX - 18} y={endY + (compact ? 38 : 30)} textAnchor="end" fontSize={G.fs} fill="#F1DC9A">
              170.0 lb by Nov 15
            </text>
          </motion.g>

          {/* water band (phase 2+) */}
          <motion.path
            d={paths.band}
            fill="url(#dd-cyan)"
            initial={false}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.9 }}
          />

          {/* raw scale dots */}
          <g clipPath="url(#dd-reveal)">
            {data.raw.slice(0, -1).map((p) => (
              <circle
                key={p.d}
                cx={x(p.d)}
                cy={y(p.v)}
                r={G.dot}
                fill="#DCE6F5"
                fillOpacity={phase >= 3 ? 0.4 : 0.85}
                style={{ transition: "fill-opacity 0.8s" }}
              />
            ))}
          </g>

          {/* true trend (phase 3+) */}
          <motion.path
            d={paths.gold}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={compact ? 10 : 8}
            strokeOpacity="0.35"
            filter="url(#dd-glow)"
            initial={false}
            animate={{ pathLength: phase >= 3 ? 1 : 0, opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: phase >= 3 ? 1.8 : 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d={paths.gold}
            fill="none"
            stroke="url(#dd-gold)"
            strokeWidth={compact ? 4.5 : 3.5}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: phase >= 3 ? 1 : 0, opacity: phase >= 3 ? 1 : 0 }}
            transition={{ duration: phase >= 3 ? 1.8 : 0.3, ease: "easeInOut" }}
          />

          {/* today's spike */}
          <motion.g initial={false} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }}>
            <line x1={todayX} x2={todayX} y1={spikeY} y2={dryY} stroke={phase >= 2 ? "#38BDF8" : "#F87171"} strokeWidth="2" strokeDasharray="3 3" />
            {phase === 1 && !reduce && (
              <motion.circle
                cx={todayX}
                cy={spikeY}
                r={G.dot * 2}
                fill="none"
                stroke="#F87171"
                initial={{ r: G.dot * 1.5, opacity: 0.9 }}
                animate={{ r: G.dot * 7, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
            <circle cx={todayX} cy={spikeY} r={G.dot * 1.5} fill={phase === 1 ? "#F87171" : phase >= 2 ? "#38BDF8" : "#fff"} />
          </motion.g>
          {phase >= 3 && <circle cx={todayX} cy={dryY} r={G.dot * 1.6} fill="#D4AF37" stroke="#02040C" strokeWidth="2" />}

          {/* spike label */}
          <AnimatePresence>
            {(phase === 1 || phase === 2) && (
              <motion.g
                key={`lbl-${phase}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <rect
                  x={todayX - (compact ? 208 : 170)}
                  y={spikeY - (compact ? 58 : 48)}
                  width={compact ? 196 : 158}
                  height={compact ? 36 : 28}
                  rx={compact ? 18 : 14}
                  fill="#02040C"
                  stroke={phase === 1 ? "#F87171" : "#38BDF8"}
                  strokeOpacity="0.7"
                />
                <text
                  x={todayX - (compact ? 110 : 91)}
                  y={spikeY - (compact ? 34 : 29.5)}
                  textAnchor="middle"
                  fontSize={G.fs}
                  fill={phase === 1 ? "#FCA5A5" : "#7DD3FC"}
                >
                  {phase === 1 ? "+2.8 lb overnight?" : "2.8 lb of water"}
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* variance badge */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <rect x={todayX - (compact ? 164 : 138)} y={dryY + 14} width={compact ? 150 : 124} height={compact ? 34 : 26} rx={compact ? 17 : 13} fill="#02040C" stroke="#D4AF37" strokeOpacity="0.6" />
                <text x={todayX - (compact ? 89 : 76)} y={dryY + (compact ? 37 : 31.5)} textAnchor="middle" fontSize={G.fs} fill="#F1DC9A">
                  +0.8 lb vs plan
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* narration */}
      <div className="mt-3 grid grid-cols-5 gap-1.5 px-1">
        {demoSteps.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setPhase(i)}
            aria-label={`Step ${i + 1}: ${s.title}`}
            className="group h-6 cursor-pointer py-2.5"
          >
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              {i < phase || reduce ? (
                <span className="block h-full w-full bg-gold/70" />
              ) : i === phase ? (
                <motion.span
                  key={`bar-${phase}-${started}-${inView}`}
                  className="block h-full bg-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: started && inView ? "100%" : "0%" }}
                  transition={{ duration: DURATIONS[i] / 1000, ease: "linear" }}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <div className="relative min-h-[72px] px-2 pb-1 pt-2 sm:min-h-[50px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
          >
            <div className="font-display text-[22px] leading-tight text-white sm:text-[26px]">{demoSteps[phase].title}</div>
            <div className="mt-1 text-[13.5px] leading-snug text-white/60 sm:text-[14.5px]">{demoSteps[phase].body}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
