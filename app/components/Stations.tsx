"use client";

import { useMemo, useRef, useState, type ReactElement } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stations } from "@/app/content";
import { buildTelemetry, monotonePath, TODAY } from "@/lib/telemetry";

function Dial({ value, label, unit }: { value: number; label: string; unit: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const angle = -135 + (value / 100) * 270;
  const r = 44;
  const arcLen = 2 * Math.PI * r * 0.75;

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 120 120" className="h-28 w-28 sm:h-32 sm:w-32" aria-label={`${label}: ${value}${unit}`}>
        <defs>
          <radialGradient id={`face-${label.replace(/\s+/g, "-")}`} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#13284A" />
            <stop offset="1" stopColor="#050B1A" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="57" fill={`url(#face-${label.replace(/\s+/g, "-")})`} stroke="#D4AF37" strokeOpacity="0.55" />
        <circle cx="60" cy="60" r="53" fill="none" stroke="#F1DC9A" strokeOpacity="0.12" />
        {Array.from({ length: 41 }).map((_, i) => {
          const a = -135 + i * (270 / 40);
          const major = i % 5 === 0;
          return (
            <line key={i} x1="60" y1="9" x2="60" y2={major ? 16 : 13} stroke={major ? "#F1DC9A" : "#9FB1CC"} strokeOpacity={major ? 0.85 : 0.35} strokeWidth={major ? 1.3 : 0.7} transform={`rotate(${a} 60 60)`} />
          );
        })}
        <circle cx="60" cy="60" r={r} fill="none" stroke="#1B3152" strokeWidth="3" strokeDasharray={`${arcLen} 999`} transform="rotate(135 60 60)" strokeLinecap="round" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(135 60 60)"
          initial={{ strokeDasharray: `0 999` }}
          animate={{ strokeDasharray: `${inView || reduce ? arcLen * (value / 100) : 0} 999` }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <motion.g
          initial={{ rotate: -135 }}
          animate={{ rotate: inView || reduce ? angle : -135 }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <circle cx="60" cy="60" r="57" fill="none" stroke="none" />
          <line x1="60" y1="64" x2="60" y2="22" stroke="#F1DC9A" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
        <circle cx="60" cy="60" r="3.5" fill="#D4AF37" />
        <text x="60" y="88" textAnchor="middle" fontSize="15" className="font-mono" fill="#fff">
          {value}
          <tspan fontSize="9" fill="#9FB1CC">{unit}</tspan>
        </text>
      </svg>
      <span className="mt-2 text-[12px] text-white/55">{label}</span>
    </div>
  );
}

function MissionPreview() {
  const d = useMemo(() => {
    const t = buildTelemetry();
    const x = (day: number) => 8 + (day / TODAY) * 304;
    const y = (v: number) => 8 + ((208 - v) / 26) * 84;
    return monotonePath(t.dry.filter((p) => p.d % 3 === 0 || p.d === TODAY).map((p) => [x(p.d), y(p.v)] as [number, number]));
  }, []);
  return (
    <div>
      <div className="flex justify-center gap-6 sm:gap-10">
        <Dial value={86} label="MADI index" unit="" />
        <Dial value={92} label="Weekly compliance" unit="%" />
      </div>
      <svg viewBox="0 0 320 100" className="mt-5 w-full" aria-hidden>
        {[30, 60, 90].map((yy) => (
          <line key={yy} x1="0" x2="320" y1={yy} y2={yy} stroke="#1B3152" />
        ))}
        <path d={d} fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FuelPreview() {
  const [sel, setSel] = useState<number[]>([2, 3, 8, 14, 15, 21, 26, 33]);
  const kcal = sel.length * 85;
  const err = Math.round(20 + sel.length * 5.6);
  return (
    <div>
      <div className="mb-3 flex justify-between text-[12px] text-white/45">
        <span>Solids</span>
        <span>Liquids</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: 36 }).map((_, i) => {
          const on = sel.includes(i);
          return (
            <button
              key={i}
              aria-pressed={on}
              aria-label={`Portion ${i + 1}`}
              onClick={() => setSel((s) => (on ? s.filter((v) => v !== i) : [...s, i]))}
              className={`aspect-square rounded-lg border transition-all duration-150 active:scale-90 ${
                on ? "border-gold bg-gold/25 shadow-[0_0_12px_-2px_rgba(212,175,55,0.8)]" : i % 6 >= 4 ? "border-cyan/20 bg-cyan/[0.05]" : "border-white/10 bg-white/[0.03]"
              }`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-white/45">Estimated fuel</div>
          <div className="font-mono text-[20px] tabular-nums text-white">
            ~{kcal} <span className="text-[13px] text-white/40">kcal (±{err})</span>
          </div>
        </div>
        <span className="rounded-full bg-gold px-4 py-2 text-[12px] font-semibold text-obsidian">Log fuel</span>
      </div>
    </div>
  );
}

function BurnPreview() {
  const [effort, setEffort] = useState(1);
  const levels = [
    { name: "Low", gross: 260, net: 140 },
    { name: "Medium", gross: 420, net: 225 },
    { name: "High", gross: 600, net: 340 },
  ];
  const l = levels[effort];
  return (
    <div>
      <div className="text-[12px] text-white/45">Strength training, 60 min</div>
      <div className="mt-3 flex gap-2">
        {levels.map((lv, i) => (
          <button
            key={lv.name}
            aria-pressed={i === effort}
            onClick={() => setEffort(i)}
            className={`flex-1 rounded-full border py-2.5 text-[13px] transition-colors ${
              i === effort ? "border-gold bg-gold/15 text-champagne" : "border-white/10 text-white/50 hover:text-white/80"
            }`}
          >
            {lv.name}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-2 font-mono text-[13px] tabular-nums">
        <div className="flex justify-between text-white/45">
          <span>Gross estimate</span>
          <span className="line-through decoration-coral/60">{l.gross} kcal</span>
        </div>
        <div className="flex justify-between text-white/45">
          <span>Resting burn removed</span>
          <span>−{l.gross - l.net} kcal</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2 text-[15px] text-gold">
          <span>Net credited</span>
          <motion.span key={l.net} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            +{l.net} kcal
          </motion.span>
        </div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, () => ReactElement> = { mission: MissionPreview, fuel: FuelPreview, burn: BurnPreview };

export default function Stations() {
  return (
    <section id="stations" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{stations.heading}</h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/60">{stations.intro}</p>
        </div>

        <div className="mt-16 space-y-10 sm:space-y-16">
          {stations.items.map((s, i) => {
            const Preview = PREVIEWS[s.id];
            return (
              <div key={s.id} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <div className="text-[13px] text-gold/80">Station {i + 1}</div>
                  <h3 className="mt-2 font-display text-[34px] leading-tight text-white sm:text-[44px]">{s.name}</h3>
                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-white/60">{s.body}</p>
                </div>
                <div className="bezel no-select rounded-[22px] p-6 sm:p-8">
                  <Preview />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
