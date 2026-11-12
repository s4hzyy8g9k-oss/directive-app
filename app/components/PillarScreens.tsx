"use client";

// Phone screens for "Built around how bodies actually behave" (Gemini web refinement pass, 2026-11-05).
// Sample numbers for a 183 lb person on a cut: target 2,150 kcal, protein floor 156 g, estimated maintenance 2,650.

import { MACRO } from "./macroColors";

const P = MACRO.protein;
const C = MACRO.carbs;
const F = MACRO.fat;

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <span className="whitespace-nowrap font-app text-[13.5px] tracking-[0.12em] text-white">{title}</span>
      <span className="font-appmono text-[10px] tracking-[0.12em] text-[#8E9EB5]">{sub}</span>
    </div>
  );
}


// The app's bottom tab bar, with the screen's own tab lit.
function TabBar({ on }: { on: "MISSION" | "FUEL" }) {
  const tabs = [
    ["MISSION", "Mission Control"],
    ["FUEL", "Fuel"],
    ["BURN", "Burn"],
    ["DIRECTIVE", "Directive"],
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 border-t border-[#1E356D] bg-[#081024] px-2 pb-5 pt-2.5">
      {tabs.map(([k, label]) => (
        <div key={k} className="flex flex-col items-center gap-1">
          <span className={`h-[3px] w-5 rounded-full ${k === on ? "bg-[#C5A059]" : "bg-transparent"}`} />
          <span className={`whitespace-nowrap font-app text-[9px] ${k === on ? "text-[#C5A059]" : "text-[#8E9EB5]"}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// Event Allowance: 200 kcal a day set aside Monday to Friday, spent on Saturday's event.
export function EventAllowanceScreen() {
  const days = [
    { d: "MON", v: -200 },
    { d: "TUE", v: -200 },
    { d: "WED", v: -200 },
    { d: "THU", v: -200 },
    { d: "FRI", v: -200 },
    { d: "SAT", v: 1000 },
  ];
  return (
    <div className="absolute inset-0 px-4 pt-12">
      <Header title="FUEL" sub="THURSDAY" />
      <div className="rounded-xl border border-[#1E356D] bg-[#0C1730] px-3 py-3">
        <div className="flex items-baseline justify-between font-appmono">
          <span className="text-[9.5px] tracking-[0.14em] text-[#8E9EB5]">TODAY&apos;S TARGET</span>
          <span className="text-[17px] font-bold tabular-nums text-[#C5A059]">
            1,950 <span className="text-[10px] font-normal text-[#aab5c6]">KCAL</span>
          </span>
        </div>
        <div className="mt-1 font-appmono text-[10px] text-[#aab5c6]">2,150 base · 200 set aside for Saturday</div>
      </div>
      <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "rgba(197, 160, 89,0.3)", background: "rgba(197, 160, 89,0.05)" }}>
        <div className="flex items-baseline justify-between">
          <span className="font-appmono text-[10px] tracking-[0.16em] text-[#C5A059]">EVENT ALLOWANCE</span>
          <span className="font-appmono text-[10px] text-[#aab5c6]">SAT · DINNER OUT</span>
        </div>
        <div className="mt-2 font-appnum text-[30px] font-semibold leading-none tabular-nums text-[#C5A059]">
          +1,000<span className="ml-1.5 font-appmono text-[11px] font-normal tracking-[0.12em] text-[#aab5c6]">KCAL</span>
        </div>
        <div className="mt-4 grid grid-cols-6 items-end gap-1.5">
          {days.map((x) => (
            <div key={x.d} className="flex flex-col items-center gap-1">
              <div className="flex h-[70px] w-full items-end justify-center">
                <div className="w-full rounded-t-sm" style={{ height: x.v > 0 ? 70 : 14, background: x.v > 0 ? "linear-gradient(180deg,#C5A059,#7a5f22)" : "#2A437E" }} />
              </div>
              <span className={`font-appmono text-[9px] tabular-nums ${x.v > 0 ? "text-[#C5A059]" : "text-[#aab5c6]"}`}>{x.v > 0 ? "+1,000" : "−200"}</span>
              <span className="font-appmono text-[8.5px] tracking-[0.08em] text-[#8E9EB5]">{x.d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 font-app text-[11.5px] leading-snug text-[#aab5c6]">The week still adds up. Your calorie floors come first on every day.</div>
      <TabBar on="FUEL" />
    </div>
  );
}

// Rebound Shield: after touchdown, calories step back up toward maintenance over six weeks.
export function ReboundShieldScreen() {
  const steps = [2150, 2250, 2350, 2450, 2550, 2600, 2650];
  const W = 280;
  const H = 150;
  const lo = 2050;
  const hi = 2700;
  const x = (i: number) => 18 + (i / (steps.length - 1)) * (W - 30);
  const y = (v: number) => 10 + ((hi - v) / (hi - lo)) * (H - 30);
  const path = steps.map((v, i) => `${i ? `L${x(i).toFixed(1)},${y(steps[i - 1]).toFixed(1)} L` : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div className="absolute inset-0 px-4 pt-12">
      <Header title="REBOUND SHIELD" sub="WEEK 3 OF 6" />
      <div className="rounded-xl border border-[#1E356D] bg-[#0C1730] p-3">
        <div className="font-appmono text-[9.5px] tracking-[0.14em] text-[#8E9EB5]">DAILY CALORIES AFTER TOUCHDOWN</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" aria-hidden>
          <line x1="18" x2={W - 12} y1={y(2650)} y2={y(2650)} stroke="#8fe0b3" strokeOpacity="0.5" strokeDasharray="3 4" />
          <text x={W - 12} y={y(2650) - 5} fontSize="10" fill="#8fe0b3" textAnchor="end">Estimated maintenance</text>
          <path d={path} fill="none" stroke="#C5A059" strokeWidth="2.4" strokeLinejoin="round" />
          {steps.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={i === 3 ? 4 : 2.4} fill={i === 3 ? "#C5A059" : "#C5A059"} />
          ))}
          {["T", "1", "2", "3", "4", "5", "6"].map((l, i) => (
            <text key={l} x={x(i)} y={H - 4} fontSize="10" fill="#8E9EB5" textAnchor="middle">{l === "T" ? "TD" : `W${l}`}</text>
          ))}
        </svg>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 font-appmono">
        <div className="rounded-lg border border-[#1E356D] bg-[#0C1730] px-3 py-2">
          <div className="text-[9px] tracking-[0.14em] text-[#8E9EB5]">THIS WEEK</div>
          <div className="mt-1 text-[16px] font-bold tabular-nums text-[#C5A059]">2,450</div>
        </div>
        <div className="rounded-lg border border-[#1E356D] bg-[#0C1730] px-3 py-2">
          <div className="text-[9px] tracking-[0.14em] text-[#8E9EB5]">NEXT STEP</div>
          <div className="mt-1 text-[16px] font-bold tabular-nums text-white">+100</div>
        </div>
      </div>
      <div className="mt-3 font-app text-[11.5px] leading-snug text-[#aab5c6]">Calories step back up toward maintenance over six weeks after you reach your goal weight.</div>
      <TabBar on="MISSION" />
    </div>
  );
}

// Protein comes first: the macro HUD with the protein floor held.
export function ProteinFloorScreen() {
  const bar = (label: string, v: number, of: number, col: string, floor?: string) => (
    <div className={`rounded-lg p-2.5 ${floor ? "border" : ""}`} style={floor ? { borderColor: "rgba(52,211,153,0.45)", background: "rgba(52,211,153,0.06)" } : undefined}>
      <div className="flex items-baseline justify-between font-appmono">
        <span className="text-[10px] font-bold tracking-[0.14em]" style={{ color: col }}>{label}</span>
        <span className="text-[13px] tabular-nums" style={{ color: col }}>
          {v}
          <span className="text-[10px] text-[#aab5c6]">/{of} g</span>
        </span>
      </div>
      <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-[#1E356D]">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (v / of) * 100)}%`, background: col }} />
      </div>
      {floor && <div className="mt-1.5 font-appmono text-[9.5px] tracking-[0.08em]" style={{ color: col }}>{floor}</div>}
    </div>
  );
  return (
    <div className="absolute inset-0 px-4 pt-12">
      <Header title="MACRO RECONCILIATION" sub="TODAY" />
      <div className="rounded-xl border border-[#1E356D] bg-[#0C1730] px-3 py-2.5">
        <div className="flex items-baseline justify-between font-appmono">
          <span className="text-[9.5px] tracking-[0.14em] text-[#8E9EB5]">CALORIES · CUT</span>
          <span className="text-[17px] font-bold tabular-nums text-[#C5A059]">
            1,640<span className="text-[11px] font-normal text-[#aab5c6]"> / 2,150</span>
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-2.5">
        {bar("PROTEIN", 122, 156, P, "PROTEIN FLOOR · 156 g · SET FIRST")}
        {bar("FAT", 41, 60, F)}
        {bar("CARBS", 151, 247, C)}
      </div>
      <div className="mt-3 font-app text-[11.5px] leading-snug text-[#aab5c6]">Protein and fat floors are set first. Carbohydrates fill what is left of the day.</div>
      <TabBar on="FUEL" />
    </div>
  );
}
