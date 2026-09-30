import { traps } from "@/app/content";
import MealConsole from "./MealConsole";

function CaloriesViz() {
  return (
    <div className="w-full space-y-3">
      <div>
        <div className="flex justify-between text-[12px] text-white/50">
          <span>Your watch</span>
          <span className="font-mono text-white/70">600 kcal</span>
        </div>
        <div className="mt-1.5 h-2.5 rounded-full bg-white/[0.06]">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-steel/40 to-steel/80" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[12px] text-white/50">
          <span>Directive, net of resting burn</span>
          <span className="font-mono text-gold">225 kcal</span>
        </div>
        <div className="mt-1.5 h-2.5 rounded-full bg-white/[0.06]">
          <div className="h-full w-[37.5%] rounded-full bg-gradient-to-r from-[#A8862A] to-champagne" />
        </div>
      </div>
      <div className="text-[12px] text-coral/80">375 kcal of phantom food, every session</div>
    </div>
  );
}

function WaterViz() {
  // True trend slopes down (steeper than before); water rides above it in shorter, sharper waves.
  const trend = "M0,50 C50,52 90,56 130,62 C170,68 215,73 260,79";
  const top = "M0,24 C15,20 28,10 42,12 C58,14 70,36 88,38 C105,40 116,20 132,22 C150,24 160,44 176,42 C192,40 202,30 216,34 C232,38 244,52 260,52";
  const trendBack = "C215,73 170,68 130,62 C90,56 50,52 0,50";
  return (
    <svg viewBox="0 0 260 96" className="w-full" aria-hidden>
      <path d={`${top} L260,79 ${trendBack} Z`} fill="#38BDF8" fillOpacity="0.22" />
      <path d={top} fill="none" stroke="#9FB1CC" strokeOpacity="0.6" strokeDasharray="2 4" />
      <path d={trend} fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <text x="96" y="52" fontSize="11" fill="#7DD3FC">water</text>
      <text x="258" y="94" textAnchor="end" fontSize="11" fill="#F1DC9A">true trend</text>
    </svg>
  );
}

function ScaleViz() {
  return <MealConsole />;
}

const VIZ = { calories: CaloriesViz, water: WaterViz, scale: ScaleViz };

export default function Traps() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{traps.heading}</h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/60">{traps.intro}</p>
        </div>

        <div className="mt-16 space-y-5">
          {traps.items.map((t) => {
            const Viz = VIZ[t.kind];
            return (
              <div key={t.title} className="glass grid items-center gap-6 rounded-[20px] p-6 sm:grid-cols-[1fr_340px] sm:gap-12 sm:p-9">
                <div>
                  <h3 className="font-display text-[27px] leading-tight text-white sm:text-[32px]">{t.title}</h3>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-white/60">{t.body}</p>
                </div>
                <div className="flex items-center rounded-2xl border border-white/[0.05] bg-space/40 p-5">
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
