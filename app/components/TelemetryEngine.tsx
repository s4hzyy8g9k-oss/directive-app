"use client";

// Flexible Telemetry Engine (Gemini spec relayed by Ray, 2026-11-04). Three tabs beside a phone frame; switching
// cross-fades the screen. The OPTICAL tab plays the 6 second loop (menu scan, calibration, fuel log). With
// reduced motion the loop stops on the calibration screen and the tabs switch without movement.
// Drawn from the app's LOG FUEL screen (mock-up of build 171/172): RECENTS | FAVORITES | MEALS | RECIPES, the serving\n// sheet with the portion slider, and the BACK / LENS / VOICE dock.
// The restaurant numbers add 20% as fat and carbs, protein unchanged, as the app does.

import { MACRO } from "./macroColors";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { telemetry } from "@/app/content";
import { MicIcon } from "./AppUI";
import { VisualLog } from "./MealConsole";

export const TRANSITION_CONFIG = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

type TabId = (typeof telemetry.tabs)[number]["id"];

const GOLD = "#C5A059";
const P = MACRO.protein;
const C = MACRO.carbs;
const F = MACRO.fat;

// A 14 oz ribeye with the restaurant adjustment.
const RIBEYE = { kcal: 1026, p: 72, c: 13, f: 76 };
const BEFORE = { kcal: 1184, p: 98, c: 121, f: 33 };
const AFTER = { kcal: BEFORE.kcal + RIBEYE.kcal, p: BEFORE.p + RIBEYE.p, c: BEFORE.c + RIBEYE.c, f: BEFORE.f + RIBEYE.f };
const TARGET = 2414;

// ── small parts ──────────────────────────────────────────────────────────────
export function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-[42px] border border-[#2A3B5C] bg-[#05070f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
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
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#7a5f22] to-[#C5A059]" initial={false} animate={{ width: `${(t.kcal / TARGET) * 100}%` }} transition={{ duration: 0.9, ease: TRANSITION_CONFIG.ease }} />
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
            <div className="absolute inset-x-5 top-14 rounded-md border border-white/[0.06] bg-[#0F1B2F] px-5 py-6 font-display text-[#F8FAFC] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="text-center text-[11px] tracking-[0.3em] text-[#93a6c6]">FROM THE GRILL</div>
              <div className="mt-5 space-y-4 text-[14px]">
                <div className="flex justify-between opacity-50"><span>Half Roast Chicken</span><span>24</span></div>
                <div className="relative flex justify-between">
                  <span>Pan Seared Ribeye <span className="text-[#93a6c6]">(14 oz)</span></span>
                  <span>46</span>
                  <motion.span
                    className="absolute -inset-x-2 -inset-y-1.5 rounded border-2"
                    style={{ borderColor: GOLD, background: "rgba(197, 160, 89,0.12)" }}
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
            <div className="absolute inset-x-0 bottom-24 text-center font-appmono text-[11px] tracking-[0.18em] text-[#C5A059]">READING MENU</div>
            <div className="absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-[3px] border-white/80" />
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div key="cal" className="absolute inset-0 px-4 pt-12" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <div className="font-appmono text-[10px] tracking-[0.2em] text-[#8E9EB5]">CUSTOM · NEW MEAL</div>
            {/* The Custom Meal Card (Gemini web refinement pass, 2026-11-05). Numbers as the app works them out: a 855 kcal
                estimate plus the 20% restaurant adjustment, added as fat and carbs with protein unchanged. */}
            <div className="mt-3 rounded-lg border bg-[#162238] p-4 text-left shadow-lg" style={{ borderColor: "rgba(197, 160, 89,0.25)" }}>
              <div className="font-app text-base font-semibold leading-snug text-[#F8FAFC]">Ribeye Steak (14 oz cut detected)</div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-appmono text-xs tabular-nums text-[#94A3B8]">
                  <span style={{ color: P }}>P {RIBEYE.p}g</span>
                  <span>·</span>
                  <span style={{ color: C }}>C {RIBEYE.c}g</span>
                  <span>·</span>
                  <span style={{ color: F }}>F {RIBEYE.f}g</span>
                </div>
                <div className="font-appnum text-sm font-bold tabular-nums" style={{ color: GOLD }}>
                  <Counter to={RIBEYE.kcal} run={!reduce && active} /> kcal
                </div>
              </div>
              <motion.div
                className="mt-3 inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 font-app text-[10.5px] font-medium leading-snug tracking-[-0.01em]"
                style={{ background: "rgba(197, 160, 89,0.12)", color: GOLD }}
                animate={reduce ? undefined : { opacity: [0.4, 1] }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Restaurant adjustment applied (+20% as fat and carbs)
              </motion.div>
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

// ── 02 / PRECISION: the LOG FUEL screen as the app has it now (mock-up of build 171/172, 2026-11-12) ────────
type Food = { name: string; brand?: string; serving: string; unit: string; kcal: number; p: number; c: number; f: number; custom?: boolean };
const RECENTS: Food[] = [
  { name: "Overnight oats", serving: "1 serving", unit: "serving", kcal: 420, p: 24, c: 58, f: 10, custom: true },
  { name: "Chicken breast, grilled", serving: "6 oz", unit: "serving (6 oz)", kcal: 281, p: 53, c: 0, f: 6 },
  { name: "Jasmine rice, cooked", serving: "1 cup", unit: "cup", kcal: 205, p: 4, c: 45, f: 0 },
  { name: "Greek yogurt, plain nonfat", serving: "1 cup", unit: "cup", kcal: 130, p: 23, c: 9, f: 0 },
  { name: "Protein bar", brand: "Quest", serving: "1 bar", unit: "bar", kcal: 190, p: 21, c: 22, f: 8 },
];
const DAY = { kcal: 1176, p: 107, c: 137, f: 22 };
const STEPS = [0, 0.5, 1, 1.5, 2, 2.5, 3];
const fmt = (n: number) => n.toLocaleString("en-US");

function FoodRow({ x, onOpen }: { x: Food; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${x.name}`}
      className="flex w-full items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1A2844] px-2.5 py-2 text-left active:scale-[0.99]"
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 truncate font-appmono text-[12.5px] font-medium text-[#F1F5F9]">
          <span className="truncate">{x.brand ? `${x.brand} ${x.name}` : x.name}</span>
          {x.custom && <span className="flex-none rounded-lg border border-[#1E356D] bg-[#0E1B38] px-1.5 py-px text-[9.5px] font-bold tracking-[0.06em] text-[#aab5c6]">CUSTOM</span>}
        </span>
        <span className="mt-1 flex justify-between gap-2 font-appmono text-[10px] text-[#94A3B8]">
          <span className="truncate">{x.serving}</span>
          <span className="flex-none">
            <b style={{ color: P }}>P {x.p}</b> · <b style={{ color: C }}>C {x.c}</b> · <b style={{ color: F }}>F {x.f}</b> · <b className="text-[11px] text-[#C5A059]">{x.kcal} kcal</b>
          </span>
        </span>
      </span>
      <span aria-hidden className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-[#C5A059] text-[13px] leading-none text-[#C5A059]">+</span>
    </button>
  );
}

function ServingSheet({ x, onClose, onQueue, onLog }: { x: Food; onClose: () => void; onQueue: (m: number) => void; onLog: (m: number) => void }) {
  const [amt, setAmt] = useState(1);
  const k = (n: number) => Math.round(n * amt);
  return (
    <motion.div className="absolute inset-0 z-20 bg-[#02040d]/70 px-3 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <motion.div
        className="rounded-2xl border border-[#1E356D] bg-[#0E1B38] p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={TRANSITION_CONFIG}
      >
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="font-appmono text-[10px] font-bold tracking-[0.1em] text-[#aab5c6]">CANCEL</button>
        </div>
        <div className="mt-1.5 border-b border-[#1E356D] pb-2 font-appmono text-[13px] font-bold text-white">{x.brand ? `${x.brand} ${x.name}` : x.name}</div>
        <div className="mt-2.5 font-appmono text-[9px] tracking-[0.12em] text-[#8E9EB5]">SERVING</div>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#2A437E] bg-[#14244D] py-2 text-center font-appmono text-[15px] font-bold tabular-nums text-white">{amt}</div>
          <div className="rounded-lg border border-[#2A437E] bg-[#14244D] py-2 text-center font-app text-[14px] text-white">{x.unit} ▾</div>
        </div>
        <div className="relative mt-3">
          <div className="pointer-events-none absolute inset-x-[7px] top-1/2 flex -translate-y-1/2 justify-between">
            {STEPS.map((s) => (
              <span key={s} className="h-2.5 w-px bg-[#C5A059]/50" />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={3}
            step={0.5}
            value={amt}
            onChange={(e) => setAmt(Number(e.target.value))}
            aria-label="Portion slider"
            className="relative w-full accent-[#C5A059]"
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-appmono text-[9px] tracking-[0.12em] text-[#8E9EB5]">
          <span>FUEL TELEMETRY</span>
        </div>
        <div className="mt-1.5 font-appmono text-[12px] font-bold tabular-nums">
          <span className="text-[#C5A059]">{fmt(k(x.kcal))} KCAL</span> · <span style={{ color: P }}>P {k(x.p)}</span> · <span style={{ color: C }}>C {k(x.c)}</span> ·{" "}
          <span style={{ color: F }}>F {k(x.f)}</span>
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2 font-appmono text-[11px] font-bold tracking-[0.06em]">
          <button type="button" onClick={() => onQueue(amt)} disabled={amt === 0} className="rounded-lg border border-white/70 py-2.5 text-white disabled:opacity-40">+ QUEUE &amp; NEXT</button>
          <button type="button" onClick={() => onLog(amt)} disabled={amt === 0} className="rounded-lg bg-[#C5A059] py-2.5 text-[#0A1128] disabled:opacity-40">LOG ALL</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PrecisionLedgerMockup() {
  const [day, setDay] = useState(DAY);
  const [queue, setQueue] = useState<{ x: Food; m: number }[]>([]);
  const [open, setOpen] = useState<Food | null>(null);
  const add = (t: typeof DAY, x: Food, m: number) => ({ kcal: t.kcal + Math.round(x.kcal * m), p: t.p + Math.round(x.p * m), c: t.c + Math.round(x.c * m), f: t.f + Math.round(x.f * m) });
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="bg-[#0A1128] px-3 pb-3 pt-11">
        <div className="flex items-center justify-between gap-1.5">
          <span className="font-app text-[22px] leading-none text-[#aab5c6]">‹</span>
          <span className="rounded-2xl border border-[#C5A059] bg-[#0E1B38] px-3 py-1 font-app text-[13px] font-medium text-[#F8FAFC]">Dinner ▾</span>
          <span className="flex h-[30px] items-center rounded-2xl border-[1.5px] border-[#C5A059] bg-[#0C1630] p-[1.5px]" aria-label="Precision mode on">
            <span className="flex h-full items-center rounded-[13px] bg-[#C5A059] px-1.5 text-[#0A1128]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18M7 21h10M4.5 6h15" />
                <path d="M4.5 6 1.5 13.5a3 3 0 0 0 6 0L4.5 6zM19.5 6l-3 7.5a3 3 0 0 0 6 0L19.5 6z" />
              </svg>
            </span>
            <span className="flex h-full items-center px-1.5 text-white">
              <svg width="25" height="17" viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="18" cy="12" r="7" />
                <path d="M3.5 3v5.5M1.5 3v3.5a2 2 0 0 0 4 0V3M3.5 8.5V21" />
                <path d="M32.5 21V3c-1.8 1.5-2.5 4-2.5 8.5h2.5" />
              </svg>
            </span>
          </span>
          <span className={`rounded-2xl border px-2.5 py-1 font-appmono text-[10.5px] font-bold tracking-[0.08em] ${queue.length ? "border-[#C5A059] bg-[#C5A059] text-[#0A1128]" : "border-[#C5A059]/60 bg-[#1E305C] text-[#aab5c6]"}`}>
            QUEUE ({queue.length})
          </span>
        </div>
        <div className="mt-3 rounded-[10px] border border-[#1E356D] bg-[#0C1630] px-3 py-2">
          <div className="mb-1.5 flex items-baseline justify-between font-appmono">
            <span className="text-[14px] font-extrabold tracking-[0.03em] text-[#C5A059]">
              {fmt(day.kcal)} <span className="text-[9px] font-bold tracking-[0.1em] text-[#A0B0C0]">KCAL</span>
            </span>
            <span className="flex gap-2.5 text-[11.5px] font-bold text-white">
              <span><span style={{ color: P }}>P </span>{day.p}g</span>
              <span><span style={{ color: F }}>F </span>{day.f}g</span>
              <span><span style={{ color: C }}>C </span>{day.c}g</span>
            </span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-[#1E305C]">
            <motion.div className="h-full bg-[#C5A059]" initial={false} animate={{ width: `${Math.min(100, (day.kcal / 2150) * 100)}%` }} transition={TRANSITION_CONFIG} />
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-0.5 rounded-md border border-[#1E356D] bg-[#081024] p-[2px] font-appmono text-[9.5px] font-bold tracking-[0.05em]">
          {["RECENTS", "FAVORITES", "MEALS", "RECIPES"].map((t, i) => (
            <span key={t} className={`rounded py-2 text-center ${i === 0 ? "border border-[#C5A059] bg-[#1E305C] text-white" : "border border-transparent text-[#A0B0C0]"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden border-t border-[#1E356D] bg-[#1E305C] px-3 pt-2.5">
        <div className="font-appmono text-[9px] tracking-[0.14em] text-[#aab5c6]">TODAY</div>
        {RECENTS.map((x) => (
          <FoodRow key={x.name} x={x} onOpen={() => setOpen(x)} />
        ))}
      </div>
      <div className="bg-[#0A1128] px-3 pb-3.5 pt-2.5">
        <div className="flex h-10 items-center gap-2 rounded-full bg-[#E6ECF5] px-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5D78" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13zM15.5 15.5L20 20" />
          </svg>
          <span className="font-app text-[13px] text-[#5d6a82]">Search all foods...</span>
        </div>
        <div className="mt-2 grid grid-cols-[22fr_52fr_22fr] gap-2">
          <div className="flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-xl border border-[#1E356D] bg-[#0C1938]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 7l-5 5 5 5M4 12h11a5 5 0 0 0 5-5V5" />
            </svg>
            <span className="font-appmono text-[8.5px] font-bold tracking-[0.08em] text-[#A0B0C0]">BACK</span>
          </div>
          <div className="flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-xl border-[1.5px] border-[#1E356D] bg-[#0C1938]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <path d="M3 7V4h3M18 4h3v3M21 17v3h-3M6 20H3v-3" />
              <path d="M7 8v8M10 8v8M14 8v8M17 8v8" />
            </svg>
            <span className="font-appmono text-[8.5px] font-bold tracking-[0.08em] text-[#A0B0C0]">LENS</span>
          </div>
          <div className="flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-xl border border-[#1E356D] bg-[#0C1938]">
            <MicIcon size={24} color="#C5A059" />
            <span className="font-appmono text-[8.5px] font-bold tracking-[0.08em] text-[#A0B0C0]">VOICE</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <ServingSheet
            key={open.name}
            x={open}
            onClose={() => setOpen(null)}
            onQueue={(m) => {
              setQueue((q) => [...q, { x: open, m }]);
              setOpen(null);
            }}
            onLog={(m) => {
              setDay((d) => queue.reduce((t, it) => add(t, it.x, it.m), add(d, open, m)));
              setQueue([]);
              setOpen(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 03 / TACTICAL: the app's QUICK LOG (interactive) ─────────────────────────
function QuickLogMockup() {
  return (
    <div className="absolute inset-0 overflow-y-auto px-2.5 pb-4 pt-11 [scrollbar-width:none]">
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
