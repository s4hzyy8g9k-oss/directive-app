import { traps } from "@/app/content";

// Owner, 2026-10-18, 21:52 UTC: the same look as the app's MACRO RECONCILIATION (gold horizontal bars, ratios and amounts).
function CaloriesViz() {
  const row = (label: string, value: string, pct: number, fill: string, tone: string) => (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-app text-[10.5px] tracking-[0.22em] text-[#93a6c6]">{label}</span>
        <span className={`whitespace-nowrap font-appnum text-[17px] font-semibold tabular-nums ${tone}`}>{value}</span>
      </div>
      <div className="app-mp-bar">
        <div className={fill} style={{ width: `${pct}%`, height: "100%", borderRadius: 4 }} />
      </div>
    </div>
  );
  return (
    <div className="app-panel w-full !border-[#d4af37]/40">
      <div className="flex items-center justify-between">
        <h4 className="app-panel-h">60-MINUTE LIFT</h4>
        <span className="mb-2 font-appmono text-[10px] tracking-[0.14em] text-[#f0d878]">MEDIUM</span>
      </div>
      {/* Owner, 2026-10-19, 00:57 UTC: the watch's gross on top, what is taken off under it, and the thick NET CREDITED
          bar once, at the bottom. 2026-10-19 (owner: check the maths): the app's figures for a 180 lb person, 60 min of
          weights at 3.5 METs: resting 1 MET x 81.6 kg x 1 h = 82 kcal; net (3.5 - 1) x 81.6 = 204 kcal
          (src/utils/NetMet.ts); the rest of the watch's 420 is time between sets counted as work. */}
      <div className="space-y-3">
        {row("YOUR WATCH (GROSS)", "420 kcal", 100, "bg-gradient-to-r from-[#3b4560] to-[#93a6c6]", "text-[#eaeef6]")}
        {row("RESTING BURN", "−80 kcal", 19, "bg-gradient-to-r from-[#4a2414] to-[#E06A3B]", "text-[#E06A3B]")}
        {row("REST BETWEEN SETS", "−135 kcal", 32.1, "bg-gradient-to-r from-[#4a2414] to-[#E06A3B]", "text-[#E06A3B]")}
      </div>
      <div className="mt-[18px] mb-2 flex flex-wrap items-baseline justify-between gap-x-2">
        <span className="font-app text-[10.5px] tracking-[0.22em] text-[#93a6c6]">
          NET CREDITED: <span className="font-appmono font-bold tracking-[0.12em] text-[#d4af37]">49%</span>
        </span>
        <span className="font-appnum text-[26px] font-semibold leading-none tabular-nums text-[#f0d878]">
          205<span className="text-[15px] font-medium text-[#eaeef6]"> / 420 kcal</span>
        </span>
      </div>
      <div className="app-reserve-bar">
        <div className="app-reserve-fill" style={{ width: "48.8%" }} />
      </div>
    </div>
  );
}

// The overnight spike (Gemini web refinement pass, 2026-11-05): scale readings on the left with a 3 lb jump on Tuesday,
// and a ledger on the right setting the scale against the Kalman trend for Monday to Wednesday. Sample numbers.
const READINGS = [
  { d: "W", scale: 184.9, trend: 184.5 },
  { d: "T", scale: 184.2, trend: 184.4 },
  { d: "F", scale: 184.6, trend: 184.3 },
  { d: "S", scale: 184.5, trend: 184.2 },
  { d: "S", scale: 183.7, trend: 184.1 },
  { d: "M", scale: 184.2, trend: 184.0 },
  { d: "T", scale: 187.2, trend: 183.9 },
  { d: "W", scale: 185.6, trend: 183.8 },
];
const LEDGER = [
  { day: "Mon", i: 5 },
  { day: "Tue", i: 6 },
  { day: "Wed", i: 7 },
];

function WaterViz() {
  const W = 200;
  const H = 150;
  const lo = 183;
  const hi = 188;
  const x = (i: number) => 22 + (i / (READINGS.length - 1)) * (W - 32);
  const y = (v: number) => 10 + ((hi - v) / (hi - lo)) * (H - 34);
  const trend = READINGS.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(r.trend).toFixed(1)}`).join(" ");
  const spike = READINGS[6];
  return (
    <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Sample scale readings: a 3 lb jump on Tuesday while the trend line keeps falling">
        {[184, 186, 188].map((v) => (
          <g key={v}>
            <line x1="22" x2={W - 10} y1={y(v)} y2={y(v)} stroke="#1B3152" strokeOpacity="0.8" />
            <text x="0" y={y(v) + 3} fontSize="9" fill="#5d6a82">{v}</text>
          </g>
        ))}
        <line x1={x(6)} x2={x(6)} y1={y(spike.scale)} y2={y(spike.trend)} stroke="#38BDF8" strokeOpacity="0.6" strokeDasharray="2 3" />
        <text x={x(6) - 4} y={y(spike.scale) - 7} fontSize="10" fill="#7DD3FC" textAnchor="end">+3.0 lb overnight</text>
        <path d={trend} fill="none" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {READINGS.map((r, i) => (
          <circle key={i} cx={x(i)} cy={y(r.scale)} r={i === 6 ? 3.6 : 2.4} fill={i === 6 ? "#38BDF8" : "#AAB5C6"} fillOpacity={i === 6 ? 1 : 0.8} />
        ))}
        {READINGS.map((r, i) => (
          <text key={`d${i}`} x={x(i)} y={H - 8} fontSize="9" fill="#5d6a82" textAnchor="middle">{r.d}</text>
        ))}
      </svg>
      <div className="rounded-xl border border-[#1E356D] bg-[#0C1730] px-3 py-2.5 font-appmono text-[11px] tabular-nums">
        <div className="grid grid-cols-[auto_auto_auto] gap-x-4 gap-y-1.5">
          <span className="text-[9px] tracking-[0.14em] text-[#8E9EB5]">DAY</span>
          <span className="text-right text-[9px] tracking-[0.14em] text-[#8E9EB5]">SCALE</span>
          <span className="text-right text-[9px] tracking-[0.14em] text-[#f0d878]">TREND</span>
          {LEDGER.map(({ day, i }) => (
            <div key={day} className="contents">
              <span className="text-[#eaeef6]">{day}</span>
              <span className={`text-right ${i === 6 ? "font-bold text-[#7DD3FC]" : "text-[#eaeef6]"}`}>{READINGS[i].scale.toFixed(1)}</span>
              <span className="text-right text-[#f0d878]">{READINGS[i].trend.toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 border-t border-[#1E356D] pt-1.5 text-[9px] leading-snug text-[#aab5c6]">Kalman trend, lb. Sample numbers.</div>
      </div>
    </div>
  );
}

const VIZ = { calories: CaloriesViz, water: WaterViz };

export default function Traps() {
  return (
    <section id="how-it-works" className="relative scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{traps.heading}</h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/60">{traps.intro}</p>
        </div>

        <div className="mt-16 space-y-5">
          {traps.items.map((t) => {
            const Viz = VIZ[t.kind];
            return (
              <div key={t.title} className={`glass grid items-center gap-6 rounded-[20px] p-6 sm:gap-12 sm:p-9 ${t.kind === "water" ? "lg:grid-cols-[1fr_460px]" : "sm:grid-cols-[1fr_340px]"}`}>
                <div className="min-w-0">
                  <h3 className="font-display text-[27px] leading-tight text-white sm:text-[32px]">{t.title}</h3>
                  {t.body.split("\n\n").map((para, pi) => (
                    <p key={pi} className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-white/60">{para}</p>
                  ))}
                </div>
                <div className="flex min-w-0 items-center rounded-2xl border border-white/[0.05] bg-space/40 p-5">
                  <Viz />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
