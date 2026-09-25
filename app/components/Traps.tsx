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

function ScaleViz() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="rounded-xl border hairline bg-space/60 px-4 py-3 text-center">
        <div className="font-mono text-[26px] text-white/40 line-through decoration-coral/70">14.0 g</div>
        <div className="text-[11px] text-white/40">every almond, forever</div>
      </div>
      <div className="grid grid-cols-6 gap-[3px]">
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className={`h-3.5 w-3.5 rounded-[3px] ${[8, 14, 15, 21].includes(i) ? "bg-gold shadow-[0_0_6px_#D4AF37]" : "bg-white/[0.07]"}`} />
        ))}
      </div>
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
