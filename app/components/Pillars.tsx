const PILLARS = [
  {
    kicker: "Hormonal & Luteal Decoupling",
    headline: "Never diet against your cycle.",
    body: "Progesterone-driven fluid spikes during the luteal phase can distort the scale for days at a time. Directive isolates monthly fluid retention from actual tissue change, so your flight plan stays objective and calm through every phase.",
  },
  {
    kicker: "Sarcopenia & Lean-Mass Defense",
    headline: "Preserve structural muscle, not just scale weight.",
    body: "In a deep caloric deficit — or on GLP-1 therapy, where appetite is blunted — Directive watches your protein intake floor and flags muscle-loss risk before your metabolic rate has a chance to slow.",
  },
  {
    kicker: "The Cognitive Off-Ramp",
    headline: "Precision without the digital prison.",
    body: "Replaces decimal-place food scales and barcode anxiety with a tactile 6×6 portion matrix — 95% Bayesian caloric accuracy, logged in under ten seconds.",
  },
  {
    kicker: "Net-MET Caloric Defense",
    headline: "Conservative burn modeling, by default.",
    body: "Every workout log automatically deducts resting BMR from the credited burn, protecting your Dynamic TDEE from the inflation that quietly stalls most deficits.",
  },
];

export default function Pillars() {
  return (
    <section id="physiology" className="border-t hairline bg-slate-deep/25">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[50ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Engineered for real human biology.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            Not a calorie ledger. A model of how your body actually behaves
            under stress, cycle, and caloric restriction.
          </p>
        </div>

        <div className="mt-14 divide-y hairline border-y hairline">
          {PILLARS.map((p, i) => (
            <div
              key={p.kicker}
              className="grid gap-3 py-9 sm:grid-cols-[220px_1fr] sm:gap-10"
            >
              <div className="flex items-start gap-3 sm:block">
                <span className="font-mono text-[11px] text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[12px] font-medium uppercase tracking-wide text-white/45 sm:mt-1 sm:block">
                  {p.kicker}
                </span>
              </div>
              <div className="max-w-[58ch]">
                <h3 className="text-[19px] font-semibold text-white">
                  {p.headline}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
