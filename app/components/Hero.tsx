"use client";

import HeroChart from "./HeroChart";

export default function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden bg-grid-fade" id="telemetry">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:pb-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/60">
              TELEMETRY ARCHITECTURE · 2026 CHARTER INTAKE
            </span>
          </div>

          <h1 className="text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.1rem]">
            Stop letting water weight panic and phantom calories crash your
            flight plan.
          </h1>

          <p className="mt-5 font-mono text-[13px] tracking-wide text-gold/80">
            Precision Body Composition Engine
          </p>

          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/65">
            Most trackers treat human bodies like spreadsheet ledgers: every
            water fluctuation reads as fat gain, workouts get wildly
            over-credited, and you're stuck weighing food to the gram.
            Directive separates transient fluid shifts from true dry tissue,
            calculates burn with strict Net-MET math, and replaces tracking
            neurosis with a tactile 6×6 portion matrix.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onApply}
              className="rounded-sm bg-gold px-6 py-3.5 text-[13px] font-semibold tracking-wide text-obsidian transition-transform hover:scale-[1.015] active:scale-[0.985]"
            >
              Apply for Charter Access
            </button>
            <a
              href="#stations"
              className="rounded-sm border hairline px-6 py-3.5 text-center text-[13px] font-medium tracking-wide text-white/75 transition-colors hover:border-white/30 hover:text-white"
            >
              Inspect the flight engine ↓
            </a>
          </div>
        </div>

        <div>
          <HeroChart />
        </div>
      </div>
    </section>
  );
}
