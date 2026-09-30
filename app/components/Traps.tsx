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
  // True trend slopes down; water weight rides above it in uneven waves that settle onto the trend in the last quarter.
  const trend = "M0,44 C60,48 120,58 180,68 C215,74 240,78 260,82";
  const top = "M0.0,20.0 C2.3,18.8 9.0,11.0 14.0,13.0 C19.0,15.1 24.0,30.9 30.0,32.5 C36.0,34.1 44.0,21.1 50.0,22.6 C56.0,24.1 59.7,41.4 66.0,41.5 C72.3,41.7 81.0,24.0 88.0,23.5 C95.0,22.9 102.0,38.2 108.0,38.4 C114.0,38.6 117.7,22.7 124.0,24.8 C130.3,27.0 139.0,48.6 146.0,51.4 C153.0,54.2 159.7,41.1 166.0,41.7 C172.3,42.2 179.0,50.8 184.0,54.7 C189.0,58.5 192.2,61.7 196.0,64.7 C199.8,67.7 202.3,73.6 207.0,72.6 C211.7,71.5 218.5,57.5 224.0,58.5 C229.5,59.4 235.5,76.1 240.0,78.3 C244.5,80.4 247.7,70.6 251.0,71.3 C254.3,71.9 258.5,80.2 260.0,82.0";
  return (
    <svg viewBox="0 0 260 96" className="w-full" aria-hidden>
      <path d={`${top} L260,82 C240,78 215,74 180,68 C120,58 60,48 0,44 Z`} fill="#38BDF8" fillOpacity="0.22" />
      <path d={top} fill="none" stroke="#9FB1CC" strokeOpacity="0.6" strokeDasharray="2 4" />
      <path d={trend} fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      <text x="110" y="11" fontSize="11" fill="#7DD3FC">water weight</text>
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
