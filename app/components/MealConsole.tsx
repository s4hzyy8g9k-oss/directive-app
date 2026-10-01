"use client";

import { useEffect, useRef, useState } from "react";

// Icons follow the app's Log a Meal console: solids on the left, liquids on the right.
const SOLIDS = [
  { label: "Lean Protein", d: "M6 12c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z M8 10v3M12 9v4M16 10v3" },
  { label: "Fatty Protein", d: "M6 12c0-4 2-8 6-8s6 4 6 8-2 8-6 8-6-4-6-8z M9 9c1 1 1 2 0 3M15 9c-1 1-1 2 0 3M9 15c1-1 1-2 0-3" },
  { label: "Dense Carbs", d: "M5 13a7 4 0 0 0 14 0 M5 13V9a7 4 0 0 1 14 0v4" },
  { label: "Fruit", d: "M12 8c3 0 5.5 2.5 5.5 6.5S15.5 21 12 21s-5.5-3-5.5-6.5S9 8 12 8z M12 8c0-2 1-3.5 2.5-4" },
  { label: "Vegetables", d: "M5 19c0-8 5-13 14-14 0 9-5 14-14 14z M5 19l8-8" },
  { label: "Fats", d: "M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11z" },
];

const LIQUIDS = [
  { label: "Water", d: "M7 4h10l-1 16H8z M7.5 11c2 1.2 3.5-1.2 5 0s2.5 1 3.5 0" },
  { label: "Sugary Drinks", d: "M8 9h8l-1 11H9z M7 9h10 M12 9V4l3-1" },
  { label: "Milk", d: "M8 4h8l2 4v12H6V8z M6 8h12 M10 12h4" },
  { label: "Liquor", d: "M7 4h10l-2 16H9z M8 9h8" },
  { label: "Beer", d: "M6 6h10v14H6z M16 9h2.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H16 M6 6c0-1.5 2-2.5 5-2.5s5 1 5 2.5" },
  { label: "Wine", d: "M8 3h8c0 5-1.5 8-4 8s-4-3-4-8z M12 11v9 M8.5 20h7" },
];

const MAX = 9;

export default function MealConsole() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [logged, setLogged] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const add = (k: string) => {
    if (logged) return;
    setCounts((c) => ({ ...c, [k]: Math.min(MAX, (c[k] || 0) + 1) }));
  };
  const remove = (k: string) => {
    if (logged) return;
    setCounts((c) => ({ ...c, [k]: Math.max(0, (c[k] || 0) - 1) }));
  };
  const log = () => {
    if (total === 0 || logged) return;
    setLogged(true);
    timer.current = setTimeout(() => {
      setCounts({});
      setLogged(false);
    }, 1400);
  };

  const column = (title: string, items: typeof SOLIDS) => (
    <div className="min-w-0 flex-1">
      <div className="border-b border-gold/15 pb-1.5 font-mono text-[10.5px] tracking-[0.16em] text-champagne">{title}</div>
      {items.map((it) => {
        const n = counts[it.label] || 0;
        const on = n > 0;
        return (
          <div key={it.label} className="flex items-center justify-between gap-1.5 border-b border-gold/[0.07] py-[7px] last:border-b-0">
            <button
              type="button"
              onClick={() => add(it.label)}
              aria-label={`Add a serving of ${it.label}`}
              className="flex min-w-0 flex-1 items-center gap-2 text-left active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] flex-none text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={it.d} />
              </svg>
              <span className={`truncate text-[12px] font-medium ${on ? "text-white" : "text-steel"}`}>{it.label}</span>
            </button>
            <button
              type="button"
              onClick={() => remove(it.label)}
              aria-label={`Remove a serving of ${it.label}`}
              className={`flex h-[22px] w-[24px] flex-none items-center justify-center rounded-md border font-mono text-[12px] tabular-nums transition-colors ${
                on ? "border-champagne font-bold text-white" : "border-white/10 text-white/35"
              }`}
            >
              {n}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 text-[10.5px] text-white/40">
        <span className="font-mono line-through decoration-coral/70">14.0 g weighed</span>
        <span aria-hidden>→</span>
        <span className="font-mono text-champagne">5 s tap &amp; log</span>
      </div>

      <div className="mt-3 flex gap-3.5">
        {column("FOOD", SOLIDS)}
        <div className="w-px flex-none bg-gold/15" aria-hidden />
        {column("BEVERAGE", LIQUIDS)}
      </div>

      <button
        type="button"
        onClick={log}
        disabled={total === 0 && !logged}
        className={`mt-3 w-full rounded-[10px] py-2.5 font-mono text-[11.5px] tracking-[0.14em] transition-colors ${
          logged
            ? "bg-[#4ADE80]/20 text-[#86EFAC]"
            : total === 0
              ? "cursor-not-allowed border border-[#3a4049] bg-[#2c313a] text-[#7a838e]"
              : "bg-gradient-to-b from-[#F1DC9A] via-gold to-[#B8932C] font-semibold text-obsidian"
        }`}
      >
        {logged ? "✓ LOGGED" : total === 0 ? "TAP FOODS TO ADD SERVINGS" : `LOG ${total} SERVING${total === 1 ? "" : "S"}`}
      </button>
      <div className="mt-1.5 text-center text-[10px] text-white/30">Tap a food to add a serving · tap the number to remove one</div>
    </div>
  );
}
