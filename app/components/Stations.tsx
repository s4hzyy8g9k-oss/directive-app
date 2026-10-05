"use client";

import { useMemo, useRef, useState, type ReactElement } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { stations } from "@/app/content";
import { buildTelemetry, smooth, TODAY, DRY_TODAY, FLUID_TODAY, TARGET_END } from "@/lib/telemetry";

function Dial({ value, label, unit, pct, goal }: { value: number; label: string; unit: string; pct?: number; goal?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const frac = (pct ?? value) / 100;
  const angle = -135 + frac * 270;
  const r = 44;
  const arcLen = 2 * Math.PI * r * 0.75;
  const gradId = `face-${label.replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} viewBox="0 0 120 120" className="h-[84px] w-[84px] sm:h-24 sm:w-24" aria-label={`${label}: ${value}${unit}`}>
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
          animate={{ strokeDasharray: `${inView || reduce ? arcLen * frac : 0} 999` }}
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
      {goal && <span className="mt-0.5 font-mono text-[9.5px] tracking-wide text-gold/70">{goal}</span>}
    </div>
  );
}

// ── Fuel: macro reconciliation + caloric reserve (from the app's Fuel tab) ──
function MacroPill({ label, value, of, pct, sub }: { label: string; value: number; of: number; pct: number; sub: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-[9.5px] tracking-[0.16em] text-white/45">{label}</div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-space">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#7A5F22] to-champagne"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
      <div className="mt-1.5 font-mono text-[15px] tabular-nums text-white">
        {value}
        <span className="text-[10.5px] text-white/45">/{of}g</span>
      </div>
      <div className="mt-0.5 text-[9.5px] text-white/40">{sub}</div>
    </div>
  );
}

function FuelPreview() {
  const [reserve, setReserve] = useState(false);
  return (
    <div>
      <div className="font-mono text-[10.5px] tracking-[0.16em] text-gold">MACRO RECONCILIATION</div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/45">CALORIES</span>
        <span className="font-mono text-[20px] tabular-nums text-white">
          1,640<span className="text-[11px] text-white/45"> / 2,150 kcal</span>
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-space">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#7A5F22] to-champagne"
          initial={{ width: 0 }}
          whileInView={{ width: "76%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <MacroPill label="PROTEIN" value={122} of={180} pct={68} sub="Protein floor 94%" />
        <MacroPill label="CARBS" value={151} of={240} pct={63} sub="Discretionary intact" />
        <MacroPill label="FAT" value={41} of={70} pct={59} sub="Fat floor 68%" />
      </div>

      <div className="mt-5 rounded-xl border hairline bg-space/50 px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.16em] text-gold/80">CALORIC RESERVE</span>
          <button
            type="button"
            role="switch"
            aria-checked={reserve}
            onClick={() => setReserve((v) => !v)}
            className="flex items-center gap-2 text-[11.5px] text-white/60"
          >
            Plan an event
            <span className={`relative h-[18px] w-8 rounded-full border transition-colors ${reserve ? "border-gold bg-gold/30" : "border-white/15 bg-white/[0.05]"}`}>
              <span className={`absolute top-[2px] h-3 w-3 rounded-full transition-all ${reserve ? "left-[16px] bg-champagne" : "left-[2px] bg-white/50"}`} />
            </span>
          </button>
        </div>
        <div className="mt-2 min-h-[32px] text-[11.5px] leading-snug text-white/55">
          {reserve ? (
            <>
              <span className="text-champagne">+1,000 kcal banked for your event.</span> Counterbalancing 333 kcal/day across the 3 preceding days.
            </>
          ) : (
            "Bank calories ahead of a dinner or celebration without breaking your week."
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mission Control: dials, weight chart with likely water separated out, plates, the water banner ──
function MissionPreview() {
  const chart = useMemo(() => {
    const t = buildTelemetry();
    const from = 46;
    const W = 320;
    const H = 92;
    const pad = 6;
    const rawS = smooth(t.raw, 0.5).filter((p) => p.d >= from && p.d <= TODAY);
    const dry = t.dry.filter((p) => p.d >= from && p.d <= TODAY);
    const dots = t.raw.filter((p) => p.d >= from && p.d <= TODAY);
    const all = [...rawS.map((p) => p.v), ...dry.map((p) => p.v), ...dots.map((p) => p.v)];
    const lo = Math.min(...all);
    const hi = Math.max(...all);
    const x = (d: number) => pad + ((d - from) / (TODAY - from)) * (W - 2 * pad);
    const y = (v: number) => pad + ((hi - v) / (hi - lo)) * (H - 2 * pad);
    const pt = (d: number, v: number) => `${x(d).toFixed(1)},${y(v).toFixed(1)}`;
    const upper = rawS.map((p) => pt(p.d, p.v));
    const lower = dry.map((p) => pt(p.d, p.v)).reverse();
    return {
      W,
      H,
      band: `M${upper.join(" L")} L${lower.join(" L")} Z`,
      gold: `M${dry.map((p) => pt(p.d, p.v)).join(" L")}`,
      dots: dots.map((p) => ({ cx: x(p.d), cy: y(p.v), d: p.d })),
    };
  }, []);

  const current = DRY_TODAY + FLUID_TODAY;
  const remaining = DRY_TODAY - TARGET_END;
  const plates = [
    { k: "CURRENT", v: current.toFixed(1), u: "lbs" },
    { k: "7-DAY AVG", v: (current - 1.3).toFixed(1), u: "lbs" },
    { k: "TARGET", v: TARGET_END.toFixed(1), u: "lbs" },
    { k: "REMAINING", v: remaining.toFixed(1), u: "lbs", sub: "ETA 7.9 wks" },
  ];

  return (
    <div>
      <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="w-full" role="img" aria-label="Sample scale readings with the likely-water zone separated from a smooth trend">
        {[0.25, 0.55, 0.85].map((f) => (
          <line key={f} x1="0" x2={chart.W} y1={chart.H * f} y2={chart.H * f} stroke="#1B3152" strokeOpacity="0.7" />
        ))}
        <path d={chart.band} fill="#38BDF8" fillOpacity="0.16" />
        {chart.dots.map((p) => (
          <circle key={p.d} cx={p.cx} cy={p.cy} r="1.7" fill="#AAB5C6" fillOpacity="0.75" />
        ))}
        <motion.path
          d={chart.gold}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
      <div className="mt-1 flex justify-center gap-4 text-[10px] text-white/45">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-steel/80" />Scale reading</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm bg-cyan/30" />Likely water</span>
        <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 bg-gold" />Trend</span>
      </div>

      <div className="mt-4 flex justify-center gap-3 sm:gap-7">
        <Dial value={0.7} pct={(0.7 / 0.75) * 100} unit="%" label="Velocity" goal="Goal: 0.75% / wk" />
        <Dial value={86} unit="%" label="Adherence" goal="Last 7 days" />
        <Dial value={-480} pct={(480 / 520) * 100} unit="" label="Energy balance" goal="kcal today" />
      </div>

      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border hairline bg-space/50">
        {plates.map((p, i) => (
          <div key={p.k} className={`px-3 py-2 ${i % 2 === 0 ? "border-r border-white/[0.06]" : ""} ${i < 2 ? "border-b border-white/[0.06]" : ""}`}>
            <div className="font-mono text-[9px] tracking-[0.1em] text-white/45">{p.k}</div>
            <div className="font-mono text-[16px] tabular-nums text-white">
              {p.v}
              <span className="ml-1 text-[10px] text-white/40">{p.u}</span>
              {p.sub && <span className="ml-2 text-[9.5px] text-gold/70">{p.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-full border border-cyan/30 bg-cyan/[0.06] px-3 py-1.5 text-center font-mono text-[9.5px] tracking-[0.12em] text-cyan/90">
        TEMPORARY WATER WEIGHT // LIKELY WATER SEPARATED FROM YOUR TREND
      </div>
    </div>
  );
}

// ── After touchdown, as the app runs it (owner and Gemini, 2026-10-05) ──
// Scale Shield = the first 10 days after touchdown. Rebound Shield = the six-week reverse diet, while calories step
// back up toward maintenance. Then the weight is watched against a corridor of 3 lb either side of the target.
// The picture shows what the app does; it does not promise where anyone's weight will go.
function CruisePreview() {
  return (
    <div>
      <div className="text-[18px] font-medium text-white/85 sm:text-[20px]">After touchdown</div>

      <svg
        viewBox="0 0 340 176"
        className="mt-3 w-full"
        role="img"
        aria-label="Illustration: body weight drops during the cut to touchdown. Scale Shield covers the first 10 days after touchdown. Rebound Shield covers the six-week reverse diet, while calories step back up toward maintenance. After that, the weight is watched against a corridor of 3 pounds either side of the target."
      >
        <text x="14" y="10" fontSize="9" letterSpacing="1.2" fill="#D4AF37" fillOpacity="0.85">BODY WEIGHT</text>

        {/* maintenance corridor: 3 lb either side of the target, from touchdown on */}
        <rect x="172" y="104" width="158" height="20" fill="#F1DC9A" fillOpacity="0.06" />
        <line x1="172" y1="104" x2="330" y2="104" stroke="#F1DC9A" strokeOpacity="0.55" strokeDasharray="5 5" />
        <line x1="172" y1="124" x2="330" y2="124" stroke="#F1DC9A" strokeOpacity="0.55" strokeDasharray="5 5" />
        <text x="330" y="134" textAnchor="end" fontSize="8.5" fill="#F1DC9A" fillOpacity="0.85">Corridor: target ± 3 lb</text>

        {/* target line */}
        <line x1="10" y1="114" x2="330" y2="114" stroke="#1B3152" />

        {/* phase dividers and names */}
        <line x1="172" y1="134" x2="172" y2="172" stroke="#F1DC9A" strokeOpacity="0.2" />
        <line x1="246" y1="134" x2="246" y2="172" stroke="#F1DC9A" strokeOpacity="0.2" />
        <g fontSize="9" letterSpacing="1.4" textAnchor="middle" fill="#9FB1CC">
          <text x="93" y="158">CUT</text>
          <text x="209" y="152">REVERSE DIET</text>
          <text x="209" y="163">6 WEEKS</text>
          <text x="288" y="158">MAINTENANCE</text>
        </g>

        {/* cut: the descent to the target */}
        <path d="M14,18 C72,22 124,68 172,114" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />

        {/* touchdown marker */}
        <circle cx="172" cy="114" r="4.5" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="172" cy="114" r="2" fill="#D4AF37" />
        <text x="166" y="132" textAnchor="end" fontSize="9" fill="#F1DC9A">Touchdown</text>

        {/* Scale Shield: the first 10 days after touchdown (10 of the reverse diet's 42 days) */}
        <rect x="172" y="60" width="17.6" height="64" fill="#38BDF8" fillOpacity="0.1" />
        <line x1="172" y1="60" x2="189.6" y2="60" stroke="#38BDF8" strokeOpacity="0.8" strokeWidth="1.5" />
        <text x="174" y="54" fontSize="8.5" fill="#7DD3FC">Scale Shield</text>
        <text x="174" y="44" fontSize="7.5" fill="#7DD3FC" fillOpacity="0.75">10 DAYS</text>

        {/* Rebound Shield: the six-week reverse diet */}
        <line x1="172" y1="78" x2="246" y2="78" stroke="#F1DC9A" strokeWidth="1.5" strokeOpacity="0.9" />
        <line x1="172" y1="74" x2="172" y2="82" stroke="#F1DC9A" strokeOpacity="0.9" />
        <line x1="246" y1="74" x2="246" y2="82" stroke="#F1DC9A" strokeOpacity="0.9" />
        <text x="246" y="72" textAnchor="end" fontSize="8.5" fill="#F1DC9A">Rebound Shield</text>

        {/* calories stepping back up, one step at each of six Sunday Audits */}
        <motion.path
          d="M172,96 h12.3 v-2.2 h12.3 v-1.5 h12.3 v-1.5 h12.3 v-1.5 h12.3 v-1.5 h12.5"
          fill="none"
          stroke="#F1DC9A"
          strokeWidth="1.6"
          strokeOpacity="0.9"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* body weight after touchdown: an example line inside the corridor */}
        <path d="M172,114 C190,112.5 206,115 224,112 C234,110.6 240,111.5 246,111" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M246,111 C262,110 280,113 298,111.5 C312,110.5 322,111.5 330,111" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
      </svg>

      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-white/45">
        <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 bg-gold" />Body weight (example)</span>
        <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 bg-champagne" />Calories stepping up</span>
        <span className="flex items-center gap-1.5"><span className="h-0 w-3 border-t border-dashed border-champagne" />Corridor</span>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border hairline bg-space/50 px-3 py-2">
        <span className="text-[11px] text-white/50">Days to touchdown</span>
        <span className="font-mono text-[13px] tabular-nums text-gold">55</span>
      </div>
    </div>
  );
}

// ── Burn ──
const INTENSITY = [
  { name: "Low", gross: 260, net: 140 },
  { name: "Medium", gross: 420, net: 225 },
  { name: "High", gross: 600, net: 340 },
];
const BASE_MIN = 60; // the per-hour figures above are for a 60-minute session

function BurnPreview() {
  const [effort, setEffort] = useState(1);
  const [minText, setMinText] = useState("60");
  const minutes = Math.min(240, parseInt(minText || "0", 10) || 0);
  const l = INTENSITY[effort];
  const gross = Math.round((l.gross * minutes) / BASE_MIN);
  const net = Math.round((l.net * minutes) / BASE_MIN);
  const step = (d: number) => setMinText(String(Math.min(240, Math.max(0, minutes + d))));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[18px] font-medium text-white/85 sm:text-[20px]">Strength training</div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => step(-5)}
            aria-label="Subtract 5 minutes"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[16px] text-white/60 transition-colors hover:border-gold/40 hover:text-white"
          >
            −
          </button>
          <label className="flex items-center gap-1.5 rounded-xl border hairline bg-space/60 px-2.5 py-1.5 focus-within:border-gold/60">
            <input
              value={minText}
              onChange={(e) => setMinText(e.target.value.replace(/\D/g, "").slice(0, 3))}
              onBlur={() => setMinText(String(minutes))}
              inputMode="numeric"
              aria-label="Session length in minutes"
              className="w-9 bg-transparent text-right font-mono text-[15px] tabular-nums text-white focus:outline-none"
            />
            <span className="font-mono text-[11px] text-white/45">min</span>
          </label>
          <button
            type="button"
            onClick={() => step(5)}
            aria-label="Add 5 minutes"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[16px] text-white/60 transition-colors hover:border-gold/40 hover:text-white"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 font-mono text-[10px] tracking-[0.16em] text-white/40">INTENSITY</div>
      <div className="mt-2 flex gap-2">
        {INTENSITY.map((lv, i) => (
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
          <span className="line-through decoration-coral/60">{gross} kcal</span>
        </div>
        <div className="flex justify-between text-white/45">
          <span>Resting burn removed</span>
          <span>−{gross - net} kcal</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-2 text-[15px] text-gold">
          <span>Net credited</span>
          <motion.span key={net} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            +{net} kcal
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ── Weekly Directive: this week's mission, calorie target, and how to split the cut ──
const WEEKLY_CUT = 150;
const CARDIO_KCAL_PER_MIN = 6; // moderate cardio, net of resting burn

function DirectivePreview() {
  const [food, setFood] = useState(95); // activity is always the other part of the 150
  const activity = WEEKLY_CUT - food;
  const minutes = Math.round(activity / CARDIO_KCAL_PER_MIN);
  return (
    <div>
      <div className="font-mono text-[10.5px] tracking-[0.16em] text-gold">THIS WEEK&apos;S MISSION</div>

      <div className="mt-3 flex gap-3 rounded-xl border border-gold/25 bg-gold/[0.05] p-3.5">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 flex-none text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
        <p className="text-[12.5px] leading-relaxed text-white/75">
          Your telemetry indicates a dip in deep sleep and recovery metrics over the last few days, suggesting your body might be retaining some stress-related water weight. Despite that, your dry weight has dropped one pound against a 1.4 pound target. Let&apos;s trim your daily fuel target by 150 calories to keep the momentum going, but make sure to prioritize rest this week so your recovery can be improved.
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-1 font-mono text-[11px] text-champagne">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          −150 kcal
        </span>
        <span className="text-[11px] text-white/40">vs last week&apos;s target</span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/45">CALORIE TARGET</span>
        <span className="font-mono text-[22px] tabular-nums text-white">
          2,150<span className="text-[11px] text-white/45"> kcal/day</span>
        </span>
      </div>

      <div className="mt-4 rounded-xl border hairline bg-space/50 px-3.5 py-3">
        <div className="font-mono text-[10px] tracking-[0.16em] text-gold/80">DEFICIT SPLIT</div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/55">FOOD</span>
            <span className="font-mono text-[15px] tabular-nums text-white">
              −{food} <span className="text-[10px] text-white/45">kcal/day</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={WEEKLY_CUT}
            step={5}
            value={food}
            onChange={(e) => setFood(Number(e.target.value))}
            aria-label="Calories cut from food each day"
            className="mt-1.5 w-full cursor-pointer accent-gold"
          />
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/55">ACTIVITY</span>
            <span className="font-mono text-[15px] tabular-nums text-white">
              −{activity} <span className="text-[10px] text-white/45">kcal/day</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={WEEKLY_CUT}
            step={5}
            value={activity}
            onChange={(e) => setFood(WEEKLY_CUT - Number(e.target.value))}
            aria-label="Calories burned through added activity each day"
            className="mt-1.5 w-full cursor-pointer accent-gold"
          />
          <div className="mt-1 text-[11.5px] text-champagne">
            ≈ {minutes} min of added moderate cardio per day
          </div>
        </div>

        <div className="mt-2 text-[10px] text-white/35">Move either slider and the other adjusts. Cardio estimated at about {CARDIO_KCAL_PER_MIN} kcal/min, net of resting burn.</div>
      </div>

      <p className="mt-3 text-center font-mono text-[9.5px] tracking-[0.12em] text-white/35">RECALIBRATED EVERY SUNDAY // FLIGHT AUDIT</p>
    </div>
  );
}

const PREVIEWS: Record<string, () => ReactElement> = {
  fuel: FuelPreview,
  mission: MissionPreview,
  cruise: CruisePreview,
  burn: BurnPreview,
  directive: DirectivePreview,
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
                  <h3 className="font-display text-[34px] leading-tight text-white sm:text-[44px]">{s.name}</h3>
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
