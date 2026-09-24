"use client";

import { useState } from "react";

function MissionControlPreview() {
  return (
    <div className="no-select rounded-sm border hairline bg-obsidian/70 p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {["1W", "1M", "3M", "1Y", "MISSION"].map((r, i) => (
            <span
              key={r}
              className={`rounded-[2px] px-1.5 py-0.5 text-[8px] ${
                i === 4 ? "bg-gold text-obsidian" : "text-white/40"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
        <span className="font-mono text-[8px] text-white/35">RHR 54</span>
      </div>
      <svg viewBox="0 0 240 70" className="mt-3 h-16 w-full">
        <path
          d="M0,40 C30,44 50,50 80,54 C110,58 130,52 160,44 C185,37 210,26 240,18"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        <circle cx="80" cy="54" r="2" fill="#fff" fillOpacity="0.7" />
        <circle cx="140" cy="48" r="2" fill="#fff" fillOpacity="0.7" />
        <circle cx="200" cy="30" r="2" fill="#fff" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

function FuelMatrixPreview() {
  const [selected, setSelected] = useState<number[]>([7, 13]);
  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <div className="no-select rounded-sm border hairline bg-obsidian/70 p-4">
      <div className="grid grid-cols-6 gap-1">
        {Array.from({ length: 36 }).map((_, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`aspect-square rounded-[2px] border transition-colors ${
              selected.includes(i)
                ? "border-gold bg-gold/25"
                : "border-white/10 bg-white/[0.03]"
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/50 tabular-nums">
          ESTIMATED FUEL: ~680 KCAL (±65)
        </span>
        <span className="rounded-sm bg-gold px-2 py-1 text-[8px] font-semibold text-obsidian">
          LOG FUEL
        </span>
      </div>
    </div>
  );
}

function BurnLoggerPreview() {
  const [effort, setEffort] = useState(1);
  const levels = ["LOW", "MEDIUM", "HIGH"];
  const net = [140, 225, 340];
  return (
    <div className="no-select rounded-sm border hairline bg-obsidian/70 p-4">
      <div className="flex gap-1.5">
        {levels.map((l, i) => (
          <button
            key={l}
            onClick={() => setEffort(i)}
            className={`flex-1 rounded-[2px] border py-2 text-[9px] font-medium tracking-wide transition-colors ${
              i === effort
                ? "border-gold bg-gold/15 text-gold"
                : "border-white/10 text-white/40"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-white/50 tabular-nums">
        <span>RESTING BMR DEDUCTED</span>
        <span className="text-gold">NET +{net[effort]} KCAL</span>
      </div>
    </div>
  );
}

const STATIONS = [
  {
    n: "01",
    name: "Mission Control",
    body: "Multi-tier timeframe zoom, fluid-decoupled telemetry, resting heart rate, and tactile horology dials — one honest read on where you actually stand.",
    preview: <MissionControlPreview />,
  },
  {
    n: "02",
    name: "Fuel Station",
    body: "A symmetrical 6×6 avionics matrix for solids and liquids, with a live estimate ticker. Tap, don't weigh — logged in under ten seconds.",
    preview: <FuelMatrixPreview />,
  },
  {
    n: "03",
    name: "Burn Station",
    body: "Three-tier effort logging that deducts resting BMR automatically, so a hard session never overstates your net energy expenditure.",
    preview: <BurnLoggerPreview />,
  },
];

export default function Stations() {
  return (
    <section id="stations" className="border-t hairline">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[46ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Three stations. One flight plan.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            Everything Directive tracks routes through one of three
            instrument panels.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {STATIONS.map((s) => (
            <div
              key={s.n}
              className="rounded-md border hairline bg-slate-deep/40 p-6"
            >
              <span className="font-mono text-[11px] text-gold/70">
                STATION {s.n}
              </span>
              <h3 className="mt-1.5 text-[17px] font-semibold text-white">
                {s.name}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">
                {s.body}
              </p>
              <div className="mt-5">{s.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
