import { traps } from "@/app/content";

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
  return (
    <svg viewBox="0 0 260 110" className="w-full" aria-hidden>
      <path d="M0,40 C40,38 60,20 90,34 C120,48 140,14 170,22 C200,30 215,6 260,12 L260,72 C215,78 200,80 170,82 C140,84 120,86 90,88 C60,90 40,92 0,94 Z" fill="#38BDF8" fillOpacity="0.22" />
      <path d="M0,40 C40,38 60,20 90,34 C120,48 140,14 170,22 C200,30 215,6 260,12" fill="none" stroke="#9FB1CC" strokeOpacity="0.6" strokeDasharray="2 4" />
      <path d="M0,94 C40,92 60,90 90,88 C120,86 140,84 170,82 C200,80 215,78 260,72" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <text x="258" y="104" textAnchor="end" fontSize="11" fill="#F1DC9A">true trend</text>
      <text x="4" y="30" fontSize="11" fill="#7DD3FC">water</text>
    </svg>
  );
}

function MealIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const MEAL_PATHS = [
  "M4 12a8 8 0 0 0 16 0Z M4 12h16", // bowl
  "M12 3v18M7 3a5 5 0 0 0 0 10M17 3a5 5 0 0 0 0 10", // fork+knife
  "M6 3h9l-1 13a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3Z M6 8h9", // cup
  "M4 10 L12 4 L20 10 L20 12 L4 12 Z M5 12 L5 19 L19 19 L19 12", // sandwich/plate-ish
];

function ScaleViz() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-xl border hairline bg-space/60 px-3 py-2.5 text-center">
          <div className="font-mono text-[19px] text-white/35 line-through decoration-coral/70">14.0 g</div>
          <div className="text-[10px] text-white/35">weighed, forever</div>
        </div>
        <svg viewBox="0 0 24 24" className="h-4 w-6 text-white/25 sm:w-8" fill="none" aria-hidden>
          <path d="M4 12h16m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="rounded-xl border border-gold/40 bg-gold/[0.08] px-3 py-2.5 text-center">
          <div className="font-mono text-[19px] text-champagne">5.0 s</div>
          <div className="text-[10px] text-gold/70">tap &amp; log</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {MEAL_PATHS.map((path, i) => (
          <div
            key={i}
            className={`flex aspect-square items-center justify-center rounded-xl border transition-colors ${
              i === 1 ? "border-gold bg-gold/15 text-champagne shadow-[0_0_10px_-2px_rgba(212,175,55,0.7)]" : "border-white/10 bg-white/[0.03] text-white/40"
            }`}
          >
            <MealIcon path={path} />
          </div>
        ))}
      </div>
      <div className="mt-2.5 text-center text-[11px] text-champagne/80">Visual meal selection</div>
    </div>
  );
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
              <div key={t.title} className="glass grid items-center gap-6 rounded-[20px] p-6 sm:grid-cols-[1fr_320px] sm:gap-12 sm:p-9">
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
