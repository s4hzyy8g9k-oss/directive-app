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
  const gradId = `face-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 120 120" className="h-24 w-24 sm:h-28 sm:w-28" aria-label={`${label}: ${value}${unit}`}>
        <defs>
          <radialGradient id={gradId} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#13284A" />
            <stop offset="1" stopColor="#050B1A" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="57" fill={`url(#${gradId})`} stroke="#D4AF37" strokeOpacity="0.55" />
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
        <motion.g initial={{ rotate: -135 }} animate={{ rotate: inView || reduce ? angle : -135 }} transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}>
          <circle cx="60" cy="60" r="57" fill="none" stroke="none" />
          <line x1="60" y1="64" x2="60" y2="22" stroke="#F1DC9A" strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
        <circle cx="60" cy="60" r="3.5" fill="#D4AF37" />
        <text x="60" y="88" textAnchor="middle" fontSize="15" className="font-mono" fill="#fff">
          {value}
          <tspan fontSize="9" fill="#9FB1CC">{unit}</tspan>
        </text>
      </svg>
      <span className="mt-1.5 text-[11px] text-white/55 sm:text-[12px]">{label}</span>
    </div>
  );
}

// ── Station 01: Fuel — visual meal selection + rapid entry, no grid ──
function MealIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const MEALS = [
  { d: "M4 12a8 8 0 0 0 16 0Z M4 12h16", kcal: 340, protein: 18, label: "Bowl" },
  { d: "M6 3h9l-1 13a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3Z M6 8h9", kcal: 90, protein: 1, label: "Drink" },
  { d: "M4 10 L12 4 L20 10 L20 12 L4 12 Z M5 12 L5 19 L19 19 L19 12", kcal: 480, protein: 26, label: "Plate" },
  { d: "M12 3v18M7 3a5 5 0 0 0 0 10M17 3a5 5 0 0 0 0 10", kcal: 260, protein: 32, label: "Protein" },
];

function FuelPreview() {
  const [sel, setSel] = useState<number[]>([0, 2]);
  const kcal = sel.reduce((s, i) => s + MEALS[i].kcal, 0);
  const protein = sel.reduce((s, i) => s + MEALS[i].protein, 0);
  const ceiling = 2100;
  const floor = 160;

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {MEALS.map((m, i) => {
          const on = sel.includes(i);
          return (
            <button
              key={m.label}
              aria-pressed={on}
              aria-label={m.label}
              onClick={() => setSel((s) => (on ? s.filter((v) => v !== i) : [...s, i]))}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border transition-all duration-150 active:scale-95 ${
                on ? "border-gold bg-gold/15 text-champagne shadow-[0_0_10px_-2px_rgba(212,175,55,0.7)]" : "border-white/10 bg-white/[0.03] text-white/40"
              }`}
            >
              <MealIcon d={m.d} />
              <span className="text-[9px]">{m.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2.5">
        <div>
          <div className="flex justify-between text-[11px] text-white/45">
            <span>Calorie ceiling</span>
            <span className="font-mono tabular-nums text-white/70">{kcal} / {ceiling}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
            <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${Math.min(100, (kcal / ceiling) * 100)}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] text-white/45">
            <span>Protein floor</span>
            <span className="font-mono tabular-nums text-white/70">{protein}g / {floor}g</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
            <motion.div className="h-full rounded-full bg-cyan" animate={{ width: `${Math.min(100, (protein / floor) * 100)}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-[10.5px] text-champagne/70">Tap to log — visual meal selection</div>
    </div>
  );
}

// ── Station 02: Altimeter — the trend chart, unchanged concept ──
function AltimeterPreview() {
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

// ── Station 03: Cruising Altitude — runway, event buffer, rebound shield ──
function CruisePreview() {
  return (
    <div>
      <svg viewBox="0 0 320 130" className="w-full" aria-hidden>
        <line x1="10" y1="70" x2="310" y2="70" stroke="#1B3152" />
        {/* descent to target */}
        <path d="M10,40 C90,46 150,58 190,68" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        {/* event buffer dip */}
        <path d="M120,52 C130,58 138,58 146,53" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="2 3" />
        <circle cx="133" cy="57" r="2.5" fill="#38BDF8" />
        <text x="133" y="42" textAnchor="middle" fontSize="9" fill="#7DD3FC">Event buffer</text>
        {/* touchdown marker */}
        <circle cx="190" cy="68" r="4" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="190" cy="68" r="2" fill="#D4AF37" />
        <text x="190" y="85" textAnchor="middle" fontSize="9" fill="#F1DC9A">Touchdown</text>
        {/* rebound shield: walk back up to maintenance */}
        <path d="M190,68 C230,64 260,58 300,54" fill="none" stroke="#F1DC9A" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
        <text x="300" y="46" textAnchor="end" fontSize="9" fill="#F1DC9A">Rebound Shield</text>
      </svg>
      <div className="mt-3 flex items-center justify-between rounded-lg border hairline bg-space/50 px-3 py-2">
        <span className="text-[11px] text-white/50">Days to touchdown</span>
        <span className="font-mono text-[13px] tabular-nums text-gold">55</span>
      </div>
    </div>
  );
}

// ── Station 04: Burn — unchanged concept ──
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

// ── Station 05: Flight Briefing — weekly audit + PDF export ──
function BriefingPreview() {
  const rows = [
    { label: "Actual vs. expected loss", value: "−1.1 lb", status: "good" as const },
    { label: "Protein floor met", value: "6 / 7 days", status: "good" as const },
    { label: "Adherence variance", value: "Elevated", status: "warn" as const },
  ];
  const dot = { good: "bg-[#4ADE80]", warn: "bg-champagne" };
  return (
    <div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between rounded-lg border hairline bg-space/50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-[12px] text-white/60">
              <span className={`h-1.5 w-1.5 rounded-full ${dot[r.status]}`} />
              {r.label}
            </span>
            <span className="font-mono text-[12.5px] tabular-nums text-white/85">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-gold/30 bg-gold/[0.06] px-3 py-2.5">
        <div className="text-[10px] uppercase tracking-wide text-gold/70">This week&apos;s directive</div>
        <div className="mt-0.5 text-[12.5px] text-champagne">Hold current intake, add one recovery day</div>
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border hairline py-2.5 text-[12px] text-white/70 transition-colors hover:border-gold/40 hover:text-white">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Export PDF briefing
      </button>
    </div>
  );
}

const PREVIEWS: Record<string, () => ReactElement> = {
  fuel: FuelPreview,
  altimeter: AltimeterPreview,
  cruise: CruisePreview,
  burn: BurnPreview,
  briefing: BriefingPreview,
};

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
                  <div className="text-[13px] text-gold/80">Station {String(i + 1).padStart(2, "0")}</div>
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
