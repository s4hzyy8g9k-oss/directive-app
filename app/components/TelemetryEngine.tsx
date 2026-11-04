"use client";

// Flexible Telemetry Engine (Gemini spec relayed by Ray, 2026-11-04). Three tabs beside a phone frame; switching
// cross-fades the screen. The OPTICAL tab plays the 6 second loop (menu scan, calibration, fuel log). With
// reduced motion the loop stops on the calibration screen and the tabs switch without movement.
// Drawn from the app's LOG FUEL cockpit: the macro colours, ALL | CUSTOM tabs and the BACK / SCAN / VOICE dock.
// The restaurant numbers add 20% as fat and carbs, protein unchanged, as the app does.

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { telemetry } from "@/app/content";
import { MicIcon } from "./AppUI";
import { VisualLog } from "./MealConsole";

export const TRANSITION_CONFIG = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

type TabId = (typeof telemetry.tabs)[number]["id"];

const GOLD = "#D4AF37";
const P = "#FF6B6B";
const C = "#4EA8DE";
const F = "#52B788";

// A 14 oz ribeye with the restaurant adjustment.
const RIBEYE = { kcal: 1026, p: 72, c: 13, f: 76 };
const BEFORE = { kcal: 1184, p: 98, c: 121, f: 33 };
const AFTER = { kcal: BEFORE.kcal + RIBEYE.kcal, p: BEFORE.p + RIBEYE.p, c: BEFORE.c + RIBEYE.c, f: BEFORE.f + RIBEYE.f };
const TARGET = 2414;

// ── small parts ──────────────────────────────────────────────────────────────
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[318px] rounded-[42px] border border-[#2A3B5C] bg-[#05070f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="relative h-[600px] overflow-hidden rounded-[34px] bg-[#0A1128]">{children}</div>
    </div>
  );
}

function Counter({ to, run, className }: { to: number; run: boolean; className?: string }) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) {
      setV(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 700);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <span className={className}>{v.toLocaleString("en-US")}</span>;
}

function DayBar({ t }: { t: typeof BEFORE }) {
  return (
    <div className="rounded-xl border border-[#1E356D] bg-[#0C1730] px-3 py-2.5">
      <div className="flex items-baseline justify-between font-appmono">
        <span className="text-[13px] font-bold text-[#C5A059]">
          {t.kcal.toLocaleString("en-US")} <span className="text-[10px] font-normal tracking-[0.12em] text-[#aab5c6]">KCAL</span>
        </span>
        <span className="text-[11px] font-bold">
          <span style={{ color: P }}>P</span> <span className="text-white">{t.p}g</span> <span style={{ color: F }}>F</span>{" "}
          <span className="text-white">{t.f}g</span> <span style={{ color: C }}>C</span> <span className="text-white">{t.c}g</span>
        </span>
      </div>
      <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#1E356D]">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#7a5f22] to-[#f0d878]" initial={false} animate={{ width: `${(t.kcal / TARGET) * 100}%` }} transition={{ duration: 0.9, ease: TRANSITION_CONFIG.ease }} />
      </div>
    </div>
  );
}

function Row({ name, serving, kcal, p, c, f }: { name: string; serving: string; kcal: number; p: number; c: number; f: number }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#1E356D] py-2.5 last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="truncate font-app text-[13px] text-white">{name}</div>
        <div className="truncate font-appmono text-[10px] text-[#8E9EB5]">
          {serving} · <span style={{ color: P }}>P {p}</span> · <span style={{ color: C }}>C {c}</span> · <span style={{ color: F }}>F {f}</span>
        </div>
      </div>
      <span className="font-appmono text-[13px] font-bold tabular-nums text-[#C5A059]">{kcal.toLocaleString("en-US")}</span>
    </div>
  );
}

// ── 01 / OPTICAL: the 6 second loop ──────────────────────────────────────────
function MenuScanMockup({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [stage, setStage] = useState(0);
  const playing = active && inView && !reduce;

  useEffect(() => {
    if (!playing) {
      setStage(reduce ? 1 : 0);
      return;
    }
    // 0.0 to 2.0 s scan, 2.0 to 4.0 s calibrate, 4.0 to 6.0 s fuel log (with a 0.5 s hold), then back to the scan.
    const ms = [2000, 2000, 2000];
    const id = setTimeout(() => setStage((s) => (s + 1) % 3), ms[stage]);
    return () => clearTimeout(id);
  }, [playing, stage, reduce]);

  const fade = reduce ? { duration: 0 } : TRANSITION_CONFIG;

  return (
    <div ref={ref} className="absolute inset-0" aria-label="Animation: a phone camera reads a restaurant menu, estimates a ribeye steak with the restaurant adjustment, and adds it to the day's fuel log." role="img">
      <AnimatePresence mode="sync">
        {stage === 0 && (
          <motion.div key="scan" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={fade}>
            <div className="absolute inset-0 bg-[#05070f]" />
            <div className="absolute inset-x-5 top-14 rounded-md bg-[#1b1a17] px-5 py-6 font-display text-[#e9e0cc] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="text-center text-[11px] tracking-[0.3em] text-[#b8aa8a]">FROM THE GRILL</div>
              <div className="mt-5 space-y-4 text-[14px]">
                <div className="flex justify-between opacity-50"><span>Half Roast Chicken</span><span>24</span></div>
                <div className="relative flex justify-between">
                  <span>Pan Seared Ribeye <span className="text-[#b8aa8a]">(14 oz)</span></span>
                  <span>46</span>
                  <motion.span
                    className="absolute -inset-x-2 -inset-y-1.5 rounded border-2"
                    style={{ borderColor: GOLD, background: "rgba(212,175,55,0.12)" }}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.35, ease: TRANSITION_CONFIG.ease }}
                  />
                  <motion.span
                    className="absolute -inset-x-2 -inset-y-1.5 rounded border"
                    style={{ borderColor: GOLD }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [1, 1.12, 1.22] }}
                    transition={{ delay: 1.45, duration: 0.55 }}
                  />
                </div>
                <div className="flex justify-between opacity-50"><span>Cedar Plank Salmon</span><span>34</span></div>
                <div className="flex justify-between opacity-50"><span>Steak Frites</span><span>31</span></div>
              </div>
            </div>
            {/* the reticle sweep */}
            <motion.div className="absolute inset-x-3 h-[2px]" style={{ background: GOLD, boxShadow: `0 0 12px ${GOLD}` }} initial={{ top: 40 }} animate={{ top: 330 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
            {/* viewfinder corners */}
            {["left-3 top-10 border-l-2 border-t-2", "right-3 top-10 border-r-2 border-t-2", "left-3 top-[340px] border-b-2 border-l-2", "right-3 top-[340px] border-b-2 border-r-2"].map((c) => (
              <span key={c} className={`absolute h-6 w-6 ${c}`} style={{ borderColor: GOLD }} />
            ))}
            <div className="absolute inset-x-0 bottom-24 text-center font-appmono text-[11px] tracking-[0.18em] text-[#f0d878]">READING MENU</div>
            <div className="absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-[3px] border-white/80" />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div key="cal" className="absolute inset-0 px-4 pt-12" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <div className="font-appmono text-[10px] tracking-[0.2em] text-[#8E9EB5]">CUSTOM · NEW MEAL</div>
            <div className="mt-3 rounded-xl border border-[#1E356D] bg-[#162238] p-4">
              <div className="font-app text-[16px] font-medium text-white">Ribeye steak</div>
              <div className="mt-0.5 font-appmono text-[10.5px] text-[#8E9EB5]">14 oz · best guess from the menu</div>
              <div className="mt-4 font-appnum text-[34px] font-semibold leading-none tabular-nums text-[#f0d878]">
                <Counter to={RIBEYE.kcal} run={!reduce && active} />
                <span className="ml-1.5 font-appmono text-[12px] font-normal tracking-[0.14em] text-[#aab5c6]">KCAL</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 font-appmono text-[12px]">
                {(
                  [
                    ["P", RIBEYE.p, P],
                    ["C", RIBEYE.c, C],
                    ["F", RIBEYE.f, F],
                  ] as const
                ).map(([l, n, col]) => (
                  <div key={l} className="rounded-md border border-[#1E356D] bg-[#0C1730] py-1.5 text-center">
                    <span className="font-bold" style={{ color: col }}>{l}</span> <Counter to={n} run={!reduce && active} className="text-white" />g
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-[#d4af37]/25 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-app text-[12px] text-[#eaeef6]">Restaurant adjustment</span>
                  <motion.span className="font-appmono text-[11px] font-bold text-[#f0d878]" animate={reduce ? undefined : { opacity: [1, 0.45, 1] }} transition={{ duration: 0.8, delay: 0.5 }}>
                    +20%
                  </motion.span>
                </div>
                <div className="mt-1 font-app text-[10.5px] font-light text-[#aab5c6]">Added as fat and carbs. Protein stays the same.</div>
              </div>
              <div className="mt-3 font-app text-[10.5px] text-[#93a6c6]">Tap any part to adjust it.</div>
            </div>
            <motion.div
              className="mt-4 rounded-[10px] py-3 text-center font-app text-[12.5px] font-bold tracking-[0.08em] text-[#0b0b0b]"
              style={{ background: GOLD }}
              animate={reduce ? undefined : { scale: [1, 1, 0.96, 1], filter: ["brightness(1)", "brightness(1)", "brightness(1.25)", "brightness(1)"] }}
              transition={{ duration: 0.5, delay: 1.3, times: [0, 0.2, 0.6, 1] }}
            >
              SAVE AND LOG
            </motion.div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div key="hud" className="absolute inset-0 px-4 pt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-app text-[15px] tracking-[0.14em] text-white">FUEL LOG</span>
              <span className="font-appmono text-[10px] tracking-[0.12em] text-[#8E9EB5]">TODAY</span>
            </div>
            <HudBar />
            <div className="mt-4 font-appmono text-[10px] tracking-[0.18em] text-[#8E9EB5]">LOGGED TODAY</div>
            <div className="mt-1 overflow-hidden rounded-xl border border-[#1E356D] bg-[#0E1B38] px-3">
              <motion.div className="overflow-hidden" initial={{ opacity: 0, y: -24, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} transition={{ duration: 0.5, delay: 0.55, ease: TRANSITION_CONFIG.ease }}>
                <Row name="Ribeye steak (restaurant)" serving="14 oz" kcal={RIBEYE.kcal} p={RIBEYE.p} c={RIBEYE.c} f={RIBEYE.f} />
              </motion.div>
              <Row name="Chicken and rice bowl" serving="1 bowl" kcal={612} p={52} c={74} f={11} />
              <Row name="Greek yogurt and berries" serving="1 cup" kcal={318} p={26} c={38} f={8} />
              <Row name="Oatmeal with banana" serving="1 bowl" kcal={254} p={20} c={9} f={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HudBar() {
  const [t, setT] = useState(BEFORE);
  useEffect(() => {
    const id = setTimeout(() => setT(AFTER), 600);
    return () => clearTimeout(id);
  }, []);
  return <DayBar t={t} />;
}

// ── 02 / PRECISION: the LOG FUEL cockpit ─────────────────────────────────────
function PrecisionLedgerMockup() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between gap-2 px-3 pt-12">
        <span className="font-app text-[22px] leading-none text-[#C5A059]">‹</span>
        <span className="rounded-full border-[1.5px] border-[#C5A059] px-3 py-1.5 font-appmono text-[11px] font-bold tracking-[0.08em] text-white">DINNER ▾</span>
        <span className="flex items-center gap-1.5 rounded-full border-[1.5px] border-[#C5A059] bg-[#14244D] py-1 pl-3 pr-1 font-appmono text-[11px] font-bold text-[#aab5c6]">
          QUEUE: 2 <span className="rounded-full bg-[#C5A059] px-2 py-0.5 text-[#0A1128]">✓ LOG</span>
        </span>
      </div>
      <div className="mt-3 px-3">
        <DayBar t={{ kcal: 1462, p: 128, c: 141, f: 39 }} />
      </div>
      <div className="mx-3 mt-2.5 flex rounded-md border border-[#1E356D] bg-[#081024] p-[2px] font-appmono text-[10.5px] font-bold tracking-[0.06em]">
        <span className="flex-1 rounded border border-[#C5A059] bg-[#14244D] py-1.5 text-center text-white">ALL</span>
        <span className="flex-1 py-1.5 text-center text-[#6B7C8E]">CUSTOM</span>
      </div>
      <div className="mt-3 flex-1 border-t border-[#1E356D] bg-[#14244D]/60 px-3 pt-2">
        <div className="font-appmono text-[10px] tracking-[0.18em] text-[#8E9EB5]">WAITING TO LOG</div>
        <div className="mt-1 rounded-xl border border-[#1E356D] bg-[#0E1B38] px-3">
          <Row name="Chicken breast, raw" serving="170 g" kcal={204} p={38} c={0} f={4} />
          <Row name="Turkey chili (recipe photo)" serving="1 of 6 servings" kcal={386} p={34} c={31} f={13} />
        </div>
        <div className="mt-3 font-appmono text-[10px] tracking-[0.18em] text-[#8E9EB5]">LOGGED TODAY</div>
        <div className="mt-1 rounded-xl border border-[#1E356D] bg-[#0E1B38] px-3">
          <Row name="Protein bar (barcode)" serving="1 bar · 60 g" kcal={210} p={20} c={23} f={7} />
          <Row name="Jasmine rice, cooked" serving="185 g" kcal={240} p={4} c={53} f={0} />
        </div>
      </div>
      <div className="bg-[#0A1128] px-3 pb-4 pt-2.5">
        <div className="flex h-10 items-center gap-2 rounded-full bg-[#E6ECF5] px-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5D78" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13zM15.5 15.5L20 20" />
          </svg>
          <span className="font-app text-[13px] text-[#5d6a82]">Search all foods...</span>
        </div>
        <div className="mt-2 grid grid-cols-[1fr_2fr_1fr] gap-2">
          {["BACK", "SCAN", "VOICE"].map((k) => (
            <div key={k} className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-xl border border-[#1E356D] bg-[#0C1730] font-appmono text-[9.5px] tracking-[0.12em] text-[#aab5c6]">
              {k === "BACK" && <span className="text-[18px] leading-none text-[#C5A059]">↩</span>}
              {k === "SCAN" && (
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="#fff" strokeWidth="1.6" aria-hidden>
                  <path d="M1 6V1h5M20 1h5v5M25 14v5h-5M6 19H1v-5" />
                  <path d="M7 5v10M10 5v10M12.5 5v10M15 5v10M18 5v10" />
                </svg>
              )}
              {k === "VOICE" && <MicIcon size={20} color="#C5A059" />}
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 03 / TACTICAL: the app's QUICK LOG (interactive) ─────────────────────────
function QuickLogMockup() {
  return (
    <div className="absolute inset-0 overflow-y-auto px-3 pb-4 pt-11 [scrollbar-width:none]">
      <VisualLog />
    </div>
  );
}

const MOCKUPS: Record<TabId, (p: { active: boolean }) => React.JSX.Element> = {
  optical: MenuScanMockup,
  precision: PrecisionLedgerMockup,
  tactical: QuickLogMockup,
};

export default function TelemetryEngine() {
  const [tab, setTab] = useState<TabId>("optical");
  const reduce = useReducedMotion();
  const fade = reduce ? { duration: 0 } : TRANSITION_CONFIG;
  const current = telemetry.tabs.find((t) => t.id === tab)!;
  const Mock = MOCKUPS[tab];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = telemetry.tabs.length;
    const next = telemetry.tabs[(i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : n - 1)) % n];
    setTab(next.id);
    document.getElementById(`tel-tab-${next.id}`)?.focus();
  };

  return (
    <section id="telemetry-engine" className="relative scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="min-w-0">
            <div className="font-mono text-[11px] tracking-[0.28em] text-gold">{telemetry.eyebrow}</div>
            <h2 className="mt-4 font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{telemetry.heading}</h2>
            {telemetry.intro.map((p, i) => (
              <p key={i} className={`mt-5 max-w-[60ch] text-[16.5px] leading-relaxed ${i === 0 ? "text-white/80" : "text-white/60"}`}>
                {p}
              </p>
            ))}

            <div role="tablist" aria-label="Ways to log food" className="mt-10 flex flex-col gap-2 sm:flex-row">
              {telemetry.tabs.map((t, i) => {
                const on = t.id === tab;
                return (
                  <button
                    key={t.id}
                    id={`tel-tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="tel-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`flex-1 rounded-full border whitespace-nowrap px-4 py-2.5 text-left font-mono text-[10.5px] tracking-[0.1em] sm:px-3 transition-colors sm:text-center ${
                      on ? "border-gold bg-gold/[0.12] text-champagne" : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/75"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div id="tel-panel" role="tabpanel" aria-labelledby={`tel-tab-${tab}`} className="glass relative mt-4 min-h-[230px] rounded-[20px] p-6 sm:min-h-[200px] sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={tab} initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -8 }} transition={fade}>
                  <h3 className="font-display text-[27px] leading-tight text-white sm:text-[32px]">{current.title}</h3>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-white/60">{current.body}</p>
                  {tab !== "precision" && <p className="mt-3 text-[12.5px] text-white/40">{telemetry.note}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Phone>
            <AnimatePresence mode="sync" initial={false}>
              <motion.div key={tab} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
                <Mock active />
              </motion.div>
            </AnimatePresence>
          </Phone>
        </div>
      </div>
    </section>
  );
}
