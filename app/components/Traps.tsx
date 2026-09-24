const TRAPS = [
  {
    title: "The Phantom Calorie Trap",
    body: "Fitness wearables claim a 60-minute gym lift burned 600 kcal. Once you account for rest intervals, your net expenditure is closer to 225 kcal. Eating back that phantom surplus silently erases your deficit, week after week.",
    stat: "225 of 600",
    statLabel: "kcal actually net-new",
  },
  {
    title: "The Water Weight Illusion",
    body: "Salt, heavy lifting, or hormonal shifts can trap up to 4 lbs of water overnight. Traditional apps read that as failure. Directive separates extracellular fluid from dry mass, so a hard training week never triggers a panic cut.",
    stat: "4 lbs",
    statLabel: "overnight fluid swing",
  },
  {
    title: "The Barcode Burnout",
    body: "Weighing fourteen grams of almonds for six months isn't discipline — it's cognitive drag. Precision doesn't require decimal-place micromanagement, and most people quit the app before they quit the diet.",
    stat: "14g",
    statLabel: "the measurement nobody sustains",
  },
];

export default function Traps() {
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[46ch]">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Three biological traps crash most diets before week six.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            None of them are willpower failures. They're measurement
            failures — and they compound against each other.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {TRAPS.map((t) => (
            <div
              key={t.title}
              className="flex flex-col justify-between rounded-md border hairline bg-slate-deep/50 p-6"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-white">
                  {t.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                  {t.body}
                </p>
              </div>
              <div className="mt-6 border-t hairline pt-4">
                <div className="font-mono text-xl text-gold tabular-nums">
                  {t.stat}
                </div>
                <div className="mt-0.5 text-[11px] text-white/40">
                  {t.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
