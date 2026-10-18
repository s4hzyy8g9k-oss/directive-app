"use client";

import { useMemo, useState, type ReactElement } from "react";
import { motion } from "framer-motion";
import { stations } from "@/app/content";
import { buildTelemetry, smooth, TODAY, DRY_TODAY, FLUID_TODAY, TARGET_END } from "@/lib/telemetry";
import { AppDial, AppSlider, AppSwitchKnob, MicIcon } from "./AppUI";

// Every preview below copies the app's own look from the design mock-up
// (directive-app/project-docs/design-artifact/directive-horology-mission-control.html): colours, gradients, borders, sizes.

// ── Fuel: MACRO RECONCILIATION (FuelScreen.tsx), the calorie bar and the three macro bars ──
// Example: a 183 lb person on a Cut. Protein floor 0.85 g per lb, fat floor 0.3 g per lb; carbs take the rest of 2,150 kcal.
const FUEL = { cal: 1640, calTarget: 2150, pro: 122, proTarget: 156, carb: 151, carbTarget: 247, fat: 41, fatTarget: 60 };

function grow(pct: number, duration = 1.1) {
  return {
    initial: { width: 0 },
    whileInView: { width: `${Math.min(100, pct)}%` },
    viewport: { once: true, amount: 0.6 },
    transition: { duration, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
  };
}

function MacroPill({ label, value, of }: { label: string; value: number; of: number }) {
  return (
    <div className="text-center">
      <div className="mb-1.5 font-app text-[9.5px] tracking-[0.16em] text-[#93a6c6]">{label}</div>
      <div className="app-mp-bar mb-1.5">
        <motion.div className="app-mp-fill" {...grow((value / of) * 100)} />
      </div>
      <div className="font-appnum text-[16px] font-semibold tabular-nums text-[#eaeef6]">
        {value}
        <span className="font-app text-[10.5px] font-light text-[#aab5c6]">/{of}g</span>
      </div>
    </div>
  );
}

function FuelPreview() {
  const [event, setEvent] = useState(false);
  return (
    <div>
      <div className="app-panel !border-[#d4af37]/40">
        <div className="flex items-center justify-between">
          <h4 className="app-panel-h">MACRO RECONCILIATION</h4>
          <span className="mb-2 font-appmono text-[10px] tracking-[0.14em] text-[#f0d878]">TODAY</span>
        </div>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="font-app text-[10.5px] tracking-[0.22em] text-[#93a6c6]">
            CALORIES: <span className="font-appmono font-bold tracking-[0.12em] text-[#d4af37]">CUT</span>
          </span>
          <span className="font-appnum text-[26px] font-semibold leading-none tabular-nums text-[#f0d878] sm:text-[30px]">
            1,640<span className="text-[15px] font-medium text-[#eaeef6] sm:text-[17px]"> / 2,150 kcal</span>
          </span>
        </div>
        <div className="app-reserve-bar">
          <motion.div className="app-reserve-fill" {...grow((FUEL.cal / FUEL.calTarget) * 100, 1.2)} />
        </div>

        <div className="mt-[18px] grid grid-cols-3 gap-2.5">
          <MacroPill label="PROTEIN" value={FUEL.pro} of={FUEL.proTarget} />
          <MacroPill label="CARBS" value={FUEL.carb} of={FUEL.carbTarget} />
          <MacroPill label="FAT" value={FUEL.fat} of={FUEL.fatTarget} />
        </div>
        <div className="mt-3 font-appmono text-[10px] tracking-[0.03em] text-[#aab5c6] sm:text-[10.5px]">FLOORS: Protein ≥ 156 g · Fat ≥ 55 g</div>
      </div>

      <div className="app-panel mt-3">
        <h4 className="app-panel-h">EVENT ALLOWANCE</h4>
        <button
          type="button"
          role="switch"
          aria-checked={event}
          onClick={() => setEvent((v) => !v)}
          className="flex w-full items-center justify-between gap-2.5 rounded-[10px] border border-[#d4af37]/[0.18] bg-white/[0.03] p-3 text-left"
        >
          <span className="font-app text-[12.5px] text-[#eaeef6]">Plan an event</span>
          <AppSwitchKnob on={event} />
        </button>
        <div className="mt-2 min-h-[32px] font-app text-[12px] leading-snug text-[#aab5c6]">
          {event ? (
            <>
              <span className="text-[#f0d878]">+1,000 kcal planned for your event.</span> Offset by 200 kcal a day over the 5 days before it. Your calorie floors always come first.
            </>
          ) : (
            "Plan extra calories for a dinner or celebration without breaking your week."
          )}
        </div>
      </div>
    </div>
  );
}

// ── Mission Control: the GAUGE CLUSTER (App.tsx, components/TdeeGauge.tsx + DialGauge.tsx) ──
// Example figures: estimated burn 2,650 kcal a day, today's target 2,150, trend losing 1.2 lb a week against a goal of
// 1.4 (0.75% of 183 lb), 86% of the last 7 days within 100 kcal of target, and an average of 480 kcal a day under the burn.
function GaugeCluster() {
  return (
    <div className="app-panel mt-3">
      <h4 className="app-panel-h">GAUGE CLUSTER</h4>
      <div className="app-tdee-well mb-3.5">
        <div className="mb-1.5 font-appmono text-[9.5px] tracking-[0.14em] text-[#f0d878]">EST. BASELINE TDEE</div>
        <div className="font-appmono text-[26px] font-bold leading-none tracking-[-0.01em] text-white tabular-nums sm:text-[28px]">
          2,650<small className="ml-1.5 text-[12px] font-normal tracking-[0.04em] text-[#aab5c6] sm:text-[13px]">KCAL/DAY</small>
        </div>
        <div className="mt-2 font-appmono text-[8px] tracking-[0.08em] text-[#aab5c6]">UPDATES AT THE SUNDAY AUDIT</div>
        <div className="mt-2.5 inline-block rounded-full border border-[#8fe0b3]/30 bg-[#8fe0b3]/10 px-2.5 py-[3px] font-appmono text-[10px] tracking-[0.04em] text-[#8fe0b3]">
          ▼ −30 KCAL AT LAST AUDIT
        </div>
      </div>
      <div className="mb-2.5 flex items-baseline justify-between gap-2 px-1">
        <span className="font-appmono text-[9.5px] tracking-[0.14em] text-[#f0d878]">CALORIE TARGET</span>
        <span className="font-appmono text-[17px] font-bold tabular-nums text-[#f0d878] sm:text-[18px]">
          2,150<small className="text-[12px] font-normal tracking-[0.04em] text-[#aab5c6] sm:text-[13px]"> KCAL/DAY</small>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5" aria-label="Gauge dials">
        <AppDial id="vel" label="VELOCITY" caption="Velocity" value={1.2} target={3} display="1.2" delta="Goal: 1.4 lbs/wk" />
        <AppDial id="adh" label="ADHERENCE" caption="Adherence" value={86} target={100} display="86%" delta="Goal: 100%" />
        <AppDial id="nrg" label="ENERGY" caption="Energy Balance" value={-480} min={-1000} target={1000} display="−480" delta="kcal/day" />
      </div>
    </div>
  );
}

// ── Mission Control: weight chart with likely water separated out, plates, the water banner, then the GAUGE CLUSTER ──
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

      <GaugeCluster />
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

// ── Burn: the LOG WORKOUT block (BurnScreen.tsx) ──
// RESISTANCE / CARDIO, DURATION (MIN), INTENSITY and LOG WORKOUT. Intensity is stored and shown only; a logged workout
// changes no calorie target, so there is no calorie readout here (the app no longer shows one on Burn).
type Kind = "RESISTANCE" | "CARDIO";
const LEVELS = ["LOW", "MEDIUM", "HIGH"] as const;
type Level = (typeof LEVELS)[number];

function BurnPreview() {
  const [kind, setKind] = useState<Kind>("RESISTANCE");
  const [minText, setMinText] = useState("45");
  const [level, setLevel] = useState<Level>("MEDIUM");
  const [logged, setLogged] = useState<{ kind: Kind; min: number; level: Level }[]>([]);
  const [justLogged, setJustLogged] = useState(false);
  const minutes = Math.min(600, parseInt(minText || "0", 10) || 0);

  const log = () => {
    if (minutes <= 0) return;
    setLogged((l) => [{ kind, min: minutes, level }, ...l].slice(0, 3));
    setJustLogged(true);
  };
  const touch = () => setJustLogged(false);

  return (
    <div>
      <div className="app-panel">
        <div className="flex items-center gap-2">
          <h4 className="app-panel-h flex-1">LOG WORKOUT</h4>
          <span aria-hidden className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[10px] border-[0.5px] border-[#d4af37]/45 bg-white/[0.04]">
            <MicIcon size={24} />
          </span>
        </div>
        <p className="mb-2 font-appmono text-[10.5px] text-[#aab5c6]">Say it: &quot;Cardio, 30 minutes, medium&quot;</p>

        <div role="radiogroup" aria-label="Workout type" className="mb-3 flex gap-[2px] rounded-full border border-[#d4af37]/[0.22] bg-white/[0.04] p-[3px]">
          {(["RESISTANCE", "CARDIO"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              onClick={() => {
                setKind(k);
                touch();
              }}
              className={`flex-1 rounded-full px-1 py-[9px] font-app text-[11px] tracking-[0.1em] transition-colors ${
                kind === k ? "app-gold-pill font-medium" : "text-[#93a6c6] hover:text-[#eaeef6]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <label className="mb-3 block">
          <span className="mb-[5px] block font-app text-[9.5px] tracking-[0.14em] text-[#93a6c6]">DURATION (MIN)</span>
          <input
            value={minText}
            onChange={(e) => {
              setMinText(e.target.value.replace(/\D/g, "").slice(0, 3));
              touch();
            }}
            onFocus={(e) => e.currentTarget.select()}
            onBlur={() => setMinText(minutes ? String(minutes) : "")}
            inputMode="numeric"
            aria-label="Duration in minutes"
            className="w-full rounded-lg border border-[#d4af37]/[0.22] bg-white/[0.03] px-[11px] py-[9px] font-appmono text-[15px] text-white tabular-nums outline-none focus:border-[#f0d878]"
          />
        </label>

        <div className="mb-3">
          <div className="mb-2 font-app text-[11.5px] tracking-[0.12em] text-[#93a6c6]">INTENSITY</div>
          <div role="radiogroup" aria-label="Intensity" className="flex gap-1.5">
            {LEVELS.map((lv) => (
              <button
                key={lv}
                type="button"
                role="radio"
                aria-checked={level === lv}
                onClick={() => {
                  setLevel(lv);
                  touch();
                }}
                className={`flex-1 rounded-lg border px-1 py-2.5 font-app text-[11px] font-medium tracking-[0.06em] transition-colors ${
                  level === lv ? "border-[#f0d878] bg-[#d4af37] text-white" : "border-[#d4af37]/20 bg-[#1b3152] text-[#aab5c6] hover:text-white"
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>

        {justLogged && <p className="mb-3 text-center font-appmono text-[12px] font-bold tracking-[0.1em] text-[#8fe0b3]">WORKOUT LOGGED</p>}
        <button
          type="button"
          onClick={log}
          disabled={minutes <= 0}
          className="block w-full rounded-[10px] bg-[#d4af37] p-[13px] font-app text-[12.5px] font-bold tracking-[0.08em] text-[#0b0b0b] transition-colors active:bg-[#f0d878] disabled:cursor-not-allowed disabled:border disabled:border-[#3a4049] disabled:bg-[#2c313a] disabled:text-[#7a838e]"
        >
          LOG WORKOUT
        </button>
      </div>

      {logged.length > 0 && (
        <div className="app-panel mt-3">
          <h4 className="app-panel-h">LOGGED WORKOUTS</h4>
          <ul>
            {logged.map((w, i) => (
              <li key={i} className="flex items-center justify-between border-b border-[#d4af37]/[0.12] py-2.5 last:border-b-0">
                <span className="font-app text-[13px] text-[#eaeef6]">{w.kind === "RESISTANCE" ? "Resistance training" : "Cardio"}</span>
                <span className="font-appmono text-[12px] tabular-nums text-[#f0d878]">
                  {w.min} min · {w.level.charAt(0) + w.level.slice(1).toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Weekly Directive: the weekly briefing, the new calorie target, and the DEFICIT ALLOCATION card ──
// Matches the app as of 2026-10-18: the owner's plain weekly wording, the week's full change in gold, and Gemini's
// "Compressed Cockpit" sliders (one UNLOCK / SAVE pill, values on the label lines, a BASELINE / TARGET footer), drawn
// with the app's own slider (rail, fill, 21 ticks, knurled gold thumb).
const WEEKLY_CUT = 150;
const LAST_WEEK_TARGET = 2300;
// The app counts a step as body weight in lb x 0.00015 kcal (the extra cost above resting); this example is a 180 lb person. Shown to the nearest 50.
const KCAL_PER_STEP = 180 * 0.00015;
// The usual steps: in the app, the average of the previous 7 days.
const BASELINE_STEPS = 6500;

function DirectivePreview() {
  const [food, setFood] = useState(95); // activity is always the other part of the 150
  const [unlocked, setUnlocked] = useState(false);
  const activity = WEEKLY_CUT - food;
  const steps = Math.round(activity / KCAL_PER_STEP / 50) * 50;
  // Only the FOOD part comes off what you eat; the ACTIVITY part is walked.
  const target = LAST_WEEK_TARGET - food;
  const lever = (label: string, value: number, onChange: (v: number) => void, aria: string, first: boolean) => (
    <div className={first ? "pt-1" : "mt-4 border-t border-[#d4af37]/[0.14] pt-4"}>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-app text-[12px] font-bold text-white">{label}</span>
        <span className="font-appmono text-[14px] tabular-nums text-[#C5A059]">−{value} KCAL</span>
      </div>
      <AppSlider value={value} min={0} max={WEEKLY_CUT} step={5} disabled={!unlocked} onChange={onChange} label={aria} valueText={`${value} kcal a day`} />
    </div>
  );
  return (
    <div>
      <div className="font-mono text-[10.5px] tracking-[0.16em] text-gold">WEEKLY BRIEFING</div>

      <p className="mt-3 text-[13px] leading-relaxed text-white/85">
        You logged 6 of 7 days, ate 3,150 kcal less than your estimated burn, and your trend weight dropped 0.9 lb. Your deficit streak continues.
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-white/85">
        Your calories come down this week by <span className="font-mono text-gold">{WEEKLY_CUT}</span> calories per day.
      </p>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-white/45">NEW CALORIE TARGET</span>
        <span className="font-mono text-[22px] tabular-nums text-white">
          {target.toLocaleString("en-US")}<span className="text-[11px] text-white/45"> kcal/day</span>
        </span>
      </div>

      <div className="app-panel mt-4">
        <div className="mb-2 flex min-h-[28px] items-center justify-between gap-2">
          <span className="font-appmono text-[10px] tracking-[0.16em] text-[#d4af37]">DEFICIT ALLOCATION</span>
          <button
            type="button"
            onClick={() => setUnlocked((v) => !v)}
            aria-label={unlocked ? "Save the allocation and lock the sliders" : "Unlock the deficit allocation sliders"}
            className={`inline-flex min-w-[92px] items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 font-appmono text-[10px] font-bold tracking-[0.1em] transition-colors ${
              unlocked ? "border-[#C5A059] bg-[#C5A059] text-[#0A1128]" : "border-[#2A437E] bg-[#14244D] text-[#8E9EB5]"
            }`}
          >
            {unlocked ? (
              "✓ SAVE"
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E9EB5" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 7.5-2" />
                </svg>
                UNLOCK
              </>
            )}
          </button>
        </div>
        <div className="mb-3 border-b border-[#1E356D] pb-3 font-appmono text-[10px] font-bold tracking-[0.08em] text-[#C5A059]">
          ADDED THIS WEEK: −{WEEKLY_CUT} KCAL/DAY
        </div>

        <div className={`transition-opacity ${unlocked ? "" : "opacity-40"}`}>
          {lever("FOOD", food, setFood, "Calories cut from food each day", true)}
          {lever("ACTIVITY", activity, (v) => setFood(WEEKLY_CUT - v), "Calories burned through added daily steps", false)}
          <p className="mt-2 font-app text-[12.5px] tracking-[0.02em] text-[#f0d878]">+{steps.toLocaleString("en-US")} · Added daily steps above baseline</p>
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#1E356D] pt-3.5 font-appmono text-[10px] font-bold tracking-[0.1em] text-[#8E9EB5]">
          <span>
            BASELINE: <span className="text-[13px] font-normal tracking-normal text-white tabular-nums">{BASELINE_STEPS.toLocaleString("en-US")}</span>
          </span>
          <span>
            TARGET: <span className="text-[13px] tracking-normal text-[#C5A059] tabular-nums">{(BASELINE_STEPS + steps).toLocaleString("en-US")}</span>
          </span>
        </div>
      </div>
      <div className="mt-2 text-[10px] text-white/35">Tap UNLOCK, then move either slider and the other adjusts. Steps are estimated from body weight.</div>
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
