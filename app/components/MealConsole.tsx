"use client";

// The meal demo, drawn the way the app draws it (FuelScreen.tsx and the design mock-up):
// a two-way segmented switch, VISUAL | PRECISION.
//   VISUAL    = the QUICK LOG card: SOLIDS / LIQUIDS portion rows, Restaurant Meal, ESTIMATED FUEL, LOG FUEL.
//   PRECISION = a small Manual Entry with the MEALS tab open: one saved meal, "Breakfast", logged whole with one "+".

import { useEffect, useRef, useState } from "react";
import { AppSwitchKnob, MicIcon, PlateIcon } from "./AppUI";

// Per portion, from the app's utils/VisualPortions.ts (one protein portion is a 5 oz cooked palm).
type Item = { key: string; label: string; kcal: number; p: number; c: number; f: number; oz: number; cooked?: boolean; d: string[]; circle?: boolean };
const SOLIDS: Item[] = [
  { key: "lean", label: "Lean Protein", kcal: 167, p: 35, c: 0, f: 3, oz: 0, cooked: true, d: ["M6 12c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z", "M8 10v3M12 9v4M16 10v3"] },
  { key: "fatty", label: "Fatty Protein", kcal: 272, p: 32, c: 0, f: 16, oz: 0, cooked: true, d: ["M6 12c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z", "M9 9c1 1 1 2 0 3M15 9c-1 1-1 2 0 3M9 15c1-1 1-2 0-3"] },
  { key: "carbs", label: "Dense Carbs", kcal: 161, p: 3, c: 35, f: 1, oz: 0, cooked: true, d: ["M5 13a7 4 0 0 0 14 0", "M5 13V9a7 4 0 0 1 14 0v4"] },
  { key: "fruit", label: "Fruit", kcal: 88, p: 0, c: 22, f: 0, oz: 0, d: ["M12 8c3 0 5.5 2.5 5.5 6.5S15.5 21 12 21s-5.5-3-5.5-6.5S9 8 12 8z", "M12 8c0-2 1-3.5 2.5-4"] },
  { key: "veg", label: "Vegetables", kcal: 48, p: 2, c: 10, f: 0, oz: 0, cooked: true, d: [], circle: true },
  { key: "fat", label: "Fat", kcal: 90, p: 0, c: 0, f: 10, oz: 0, cooked: true, d: ["M9 15c1-3 1-6 0-9M9 6a2 2 0 1 1 4 1c0 1-1 2-2 3"] },
];
const LIQUIDS: Item[] = [
  { key: "water", label: "Water", kcal: 0, p: 0, c: 0, f: 0, oz: 8, d: ["M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"] },
  { key: "sugary", label: "Sugary Drinks", kcal: 104, p: 0, c: 26, f: 0, oz: 8, d: ["M8 8h8l-1 12H9L8 8z", "M7 8h10", "M13 8V4l3-1"] },
  { key: "milk", label: "Milk", kcal: 125, p: 8, c: 12, f: 5, oz: 8, d: ["M9 4h6l1 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7l1-3z", "M8.5 9h7"] },
  { key: "liquor", label: "Liquor", kcal: 65.1, p: 0, c: 0, f: 0, oz: 0, d: ["M7 4h10l-1.5 16h-7L7 4z", "M7.6 9h8.8"] },
  { key: "beer", label: "Beer", kcal: 156, p: 1.5, c: 13, f: 0, oz: 0, d: ["M6 6h10v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6z", "M16 8h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"] },
  { key: "wine", label: "Wine", kcal: 118, p: 0, c: 5, f: 0, oz: 0, d: ["M8 4h8a4 4 0 0 1-4 7 4 4 0 0 1-4-7z", "M12 11v7M9 18h6"] },
];
const ALL = [...SOLIDS, ...LIQUIDS];
const MAX = 20;

// The saved meal shown under MEALS: one meal made of five foods. Grams to one decimal, calories whole.
const BREAKFAST = [
  { name: "Eggs", serving: "2 large", kcal: 143, p: 12.6, c: 0.7, f: 9.5 },
  { name: "Whole wheat toast", serving: "2 slices", kcal: 160, p: 8, c: 28, f: 2 },
  { name: "Coffee", serving: "12 fl oz", kcal: 4, p: 0.5, c: 0, f: 0 },
  { name: "Half and half", serving: "2 tbsp", kcal: 40, p: 0.9, c: 1.3, f: 3.5 },
  { name: "Mixed berries", serving: "1 cup", kcal: 70, p: 1, c: 17, f: 0.5 },
];
const one = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const MEAL = BREAKFAST.reduce((t, x) => ({ kcal: t.kcal + x.kcal, p: t.p + x.p, c: t.c + x.c, f: t.f + x.f }), { kcal: 0, p: 0, c: 0, f: 0 });
const r1 = (n: number) => Math.round(n * 10) / 10;

function parseCount(text: string) {
  const v = parseFloat(text.replace(",", "."));
  return isNaN(v) || v < 0 ? 0 : Math.min(MAX, Math.round(v * 10) / 10);
}

function Macros({ p, c, f }: { p: number; c: number; f: number }) {
  return (
    <>
      <span className="font-bold text-[#FF6B6B]">P {one(r1(p))}</span> · <span className="font-bold text-[#4EA8DE]">C {one(r1(c))}</span> ·{" "}
      <span className="font-bold text-[#52B788]">F {one(r1(f))}</span>
    </>
  );
}

function VisualLog() {
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [restaurant, setRestaurant] = useState(false);
  const [logged, setLogged] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const count = (k: string) => parseCount(texts[k] ?? "");
  const totals = ALL.reduce(
    (t, it) => {
      const n = count(it.key);
      return { kcal: t.kcal + n * it.kcal, p: t.p + n * it.p, c: t.c + n * it.c, f: t.f + n * it.f, oz: t.oz + n * it.oz, cooked: t.cooked + (it.cooked ? n * it.kcal : 0) };
    },
    { kcal: 0, p: 0, c: 0, f: 0, oz: 0, cooked: 0 },
  );
  // Restaurant Meal: the cooked portions are estimated 20% higher, the extra as 70% fat and 30% carbs.
  const extra = restaurant ? totals.cooked * 0.2 : 0;
  const kcal = Math.round(totals.kcal + extra);
  const fat = r1(totals.f + (extra * 0.7) / 9);
  const carbs = r1(totals.c + (extra * 0.3) / 4);
  const any = ALL.some((it) => count(it.key) > 0);

  const set = (k: string, v: string) => {
    setLogged(false);
    setTexts((t) => ({ ...t, [k]: v }));
  };
  const add = (k: string) => set(k, one(Math.min(MAX, count(k) + 1)));
  const log = () => {
    if (!any) return;
    setLogged(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTexts({});
      setRestaurant(false);
      setLogged(false);
    }, 1600);
  };

  const column = (title: string, items: Item[], first: boolean) => (
    <div className={`min-w-0 flex-1 ${first ? "" : "border-l border-[#1E356D] pl-2.5 sm:pl-3.5"}`}>
      <div className="mb-[5px] border-b border-[#d4af37]/[0.18] pb-1.5 font-appmono text-[10.5px] tracking-[0.16em] text-[#f0d878] sm:text-[11px]">{title}</div>
      {items.map((it) => {
        const v = texts[it.key] ?? "";
        const on = count(it.key) > 0;
        return (
          <div key={it.key} className="flex items-center justify-between gap-1.5 border-b border-[#1E356D] py-2 last:border-b-0">
            <button type="button" onClick={() => add(it.key)} aria-label={`Add a portion of ${it.label}`} className="flex min-w-0 flex-1 items-center gap-[7px] text-left active:scale-[0.98]">
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] flex-none sm:h-[18px] sm:w-[18px]" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {it.circle && <circle cx="12" cy="12" r="7" />}
                {it.d.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
              <span className={`truncate font-app text-[12px] font-medium sm:text-[13px] ${on ? "text-[#eaeef6]" : "text-[#aab5c6]"}`}>{it.label}</span>
            </button>
            <input
              value={v}
              placeholder="0"
              inputMode="decimal"
              maxLength={4}
              onChange={(e) => set(it.key, e.target.value.replace(/[^0-9.,]/g, ""))}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => set(it.key, count(it.key) ? one(count(it.key)) : "")}
              aria-label={`${it.label} portions`}
              style={{ width: Math.max(1, v.length) * 9 + 15 }}
              className={`flex-none rounded-md border bg-[#14244D] px-[2px] py-1.5 text-center font-appmono text-[14px] text-white tabular-nums outline-none placeholder:text-[#8797b3] focus:border-[#f0d878] sm:text-[15px] ${
                on ? "border-[#f0d878] font-bold" : "border-[#2A437E]"
              }`}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="mb-1.5 font-app text-[13px] font-light tracking-[0.12em] text-white">QUICK LOG</div>
      <div className="flex rounded-xl border border-[#1E356D] bg-[#0C1938] p-3 sm:p-4">
        {column("SOLIDS", SOLIDS, true)}
        {column("LIQUIDS", LIQUIDS, false)}
      </div>
      <p className="mt-2.5 text-center font-app text-[10px] italic tracking-[0.04em] text-[#93a6c6]">Tap a row to add a portion, or type a number in its box.</p>

      <button
        type="button"
        role="switch"
        aria-checked={restaurant}
        onClick={() => {
          setRestaurant((r) => !r);
          setLogged(false);
        }}
        className="mt-2.5 flex w-full items-center justify-between gap-2.5 rounded-[10px] border border-[#d4af37]/[0.18] bg-white/[0.03] p-3 text-left"
      >
        <span className="min-w-0">
          <span className="font-app text-[12.5px] text-[#eaeef6]">Restaurant Meal</span>
          {restaurant && <span className="mt-1 block font-app text-[11px] font-light leading-snug text-[#aab5c6]">Cooked portions estimated 20% higher.</span>}
        </span>
        <AppSwitchKnob on={restaurant} />
      </button>

      <div className="mt-3 rounded-lg border border-[#d4af37]/20 bg-white/[0.03] px-3 py-2.5 text-center font-appmono tracking-[0.03em]">
        <div className="text-[12px] font-bold leading-snug text-[#f0d878] sm:text-[13px]">ESTIMATED FUEL: {kcal.toLocaleString("en-US")} KCAL</div>
        <div className="mt-1 text-[9.5px] leading-normal text-[#aab5c6] sm:text-[10px]">
          P: {one(r1(totals.p))}g | C: {one(carbs)}g | F: {one(fat)}g | Fluid: {one(r1(totals.oz))} oz
        </div>
      </div>

      <button
        type="button"
        onClick={log}
        disabled={!any && !logged}
        className={`mt-3 block w-full rounded-[10px] p-[13px] font-app text-[12.5px] font-bold tracking-[0.08em] transition-colors ${
          logged
            ? "bg-[#8fe0b3]/20 text-[#8fe0b3]"
            : any
              ? "bg-[#d4af37] text-[#0b0b0b] active:bg-[#f0d878]"
              : "cursor-not-allowed border border-[#3a4049] bg-[#2c313a] text-[#7a838e]"
        }`}
      >
        {logged ? "✓ LOGGED" : "LOG FUEL"}
      </button>
    </div>
  );
}

function PrecisionLog() {
  const [queued, setQueued] = useState(0);
  const [flash, setFlash] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const addMeal = () => {
    setQueued((q) => q + 1);
    setFlash(true);
    setNote("Breakfast added");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(false), 1400);
  };
  const logAll = () => {
    if (!queued) return;
    setNote(`${queued === 1 ? "1 item" : `${queued} items`} logged to Breakfast`);
    setQueued(0);
    setFlash(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#1E356D] bg-[#0A1128]">
      {/* Header: back, the meal capsule, and the plate pill that counts what is waiting to be logged */}
      <div className="flex items-center justify-between gap-2 border-b border-[#1E356D] px-2 py-2">
        <span aria-hidden className="flex h-9 w-9 items-center justify-center font-app text-[24px] leading-none text-[#C5A059]">‹</span>
        <span className="truncate rounded-[14px] border border-[#1E356D] bg-[#0E1B38] px-3 py-1.5 font-appmono text-[11px] font-bold tracking-[0.06em] text-white sm:text-[12px]">Breakfast ▾</span>
        <span className="flex h-8 flex-none items-center gap-1.5 rounded-2xl border-[1.5px] border-[#C5A059] bg-[#14244D] pl-2.5 pr-[3px]">
          <span className="flex items-center gap-1" aria-live="polite" aria-label={`${queued} waiting to be logged`}>
            <PlateIcon size={15} color={queued ? "#FFFFFF" : "#8E9EB5"} />
            <span className={`font-appmono text-[13px] font-bold tabular-nums ${queued ? "text-white" : "text-[#8E9EB5]"}`}>{queued}</span>
          </span>
          <button
            type="button"
            onClick={logAll}
            disabled={!queued}
            aria-label="Log the foods waiting"
            className={`flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#C5A059] font-appmono text-[13px] font-bold text-[#0A1128] ${queued ? "" : "opacity-45"}`}
          >
            ✓
          </button>
        </span>
      </div>

      {/* Tabs: ALL | CREATED | MEALS | RECIPES, with MEALS open */}
      <div className="px-3 pt-2.5">
        <div className="flex rounded-md border border-[#1E356D] bg-[#081024] p-[2px]" role="tablist" aria-label="Food lists">
          {["ALL", "CREATED", "MEALS", "RECIPES"].map((t) => (
            <span
              key={t}
              role="tab"
              aria-selected={t === "MEALS"}
              className={`flex-1 rounded border py-1.5 text-center font-appmono text-[9.5px] font-bold tracking-[0.04em] sm:text-[11px] sm:tracking-[0.06em] ${
                t === "MEALS" ? "border-[#C5A059] bg-[#14244D] text-white" : "border-transparent text-[#6B7C8E]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* The saved meal and what it is made of */}
      <div className="mt-2.5 border-t border-[#1E356D] bg-[#0E1B38] px-3">
        <div className="flex h-[52px] items-center gap-2 border-b border-[#1E356D]">
          <div className="min-w-0 flex-1">
            <div className="truncate font-app text-[14px] font-medium text-white">Breakfast</div>
            <div className="truncate font-appmono text-[10.5px] text-[#8E9EB5] sm:text-[11px]">
              1 meal · <Macros p={MEAL.p} c={MEAL.c} f={MEAL.f} />
            </div>
          </div>
          <span className="font-appmono text-[15px] font-bold tabular-nums text-[#C5A059]">{MEAL.kcal}</span>
          <button
            type="button"
            onClick={addMeal}
            aria-label="Add the whole Breakfast meal to the list waiting to be logged"
            className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] font-appmono text-[15px] font-bold transition-colors ${
              flash ? "border-[#8fe0b3] bg-[#8fe0b3] text-[#2a1d05]" : "border-[#C5A059] bg-[#C5A059]/[0.12] text-[#C5A059]"
            }`}
          >
            {flash ? "✓" : "+"}
          </button>
        </div>
        <ul aria-label="In this meal">
          {BREAKFAST.map((x) => (
            <li key={x.name} className="flex items-center gap-2 border-b border-[#1E356D] py-[7px] pl-3 last:border-b-0">
              <div className="min-w-0 flex-1">
                <div className="truncate font-app text-[12.5px] text-white/90">{x.name}</div>
                <div className="truncate font-appmono text-[9.5px] text-[#8E9EB5] sm:text-[10px]">
                  {x.serving} · <Macros p={x.p} c={x.c} f={x.f} />
                </div>
              </div>
              <span className="font-appmono text-[12px] tabular-nums text-[#F0F4F8]">{x.kcal}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-baseline justify-between border-t border-[#1E356D] py-2 font-appmono text-[10px] font-bold tracking-[0.08em] text-[#8E9EB5]">
          <span>MEAL TOTAL</span>
          <span className="text-[13px] tracking-normal text-[#C5A059] tabular-nums">{MEAL.kcal} KCAL</span>
        </div>
      </div>

      <div className="min-h-[22px] px-3 pt-1.5 font-appmono text-[11px] text-[#8fe0b3]" aria-live="polite">
        {note}
      </div>

      {/* The docked search bar and the mic */}
      <div className="flex items-center gap-2 border-t border-[#1E356D] bg-[#0A1128] px-3 py-2.5">
        <div aria-hidden className="flex h-[42px] min-w-0 flex-1 items-center gap-1.5 rounded-[21px] bg-[#E6ECF5] px-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5D78" strokeWidth="1.8" strokeLinecap="round" className="flex-none">
            <path d="M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13zM15.5 15.5L20 20" />
          </svg>
          <span className="truncate font-app text-[14px] font-medium text-[#5d6a82]">Type or say a food</span>
        </div>
        <span aria-hidden className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full border-[1.5px] border-[#C5A059] bg-[#14244D]">
          <MicIcon size={20} color="#C5A059" />
        </span>
      </div>
    </div>
  );
}

export default function MealConsole() {
  const [mode, setMode] = useState<"visual" | "precision">("visual");
  return (
    <div className="w-full min-w-0">
      <div className="flex items-center justify-center gap-2 text-[10.5px] text-white/40">
        <span className="font-mono line-through decoration-coral/70">14.0 g weighed</span>
        <span aria-hidden>→</span>
        <span className="font-mono text-champagne">5 s tap &amp; log</span>
      </div>

      {/* The app's segmented switch */}
      <div className="mb-3 mt-3 flex rounded-md border border-[#1E356D] bg-[#081024] p-[2px]" role="tablist" aria-label="How to log">
        {(
          [
            ["visual", "VISUAL"],
            ["precision", "PRECISION"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={mode === k}
            onClick={() => setMode(k)}
            className={`flex-1 rounded border py-1.5 font-appmono text-[11px] font-bold tracking-[0.08em] transition-colors ${
              mode === k ? "border-[#C5A059] bg-[#14244D] text-white" : "border-transparent text-[#6B7C8E] hover:text-[#8E9EB5]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "visual" ? <VisualLog /> : <PrecisionLog />}

      {mode === "precision" && (
        <p className="mt-2.5 text-center font-app text-[11px] leading-snug text-[#93a6c6]">
          Save a meal once, then add it with one tap. Or build it on the Meals tab by saying &quot;two eggs, toast and coffee&quot;, and it picks the toast you log most often.
        </p>
      )}
    </div>
  );
}
