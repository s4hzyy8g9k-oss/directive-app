import { shields } from "@/app/content";

// The three Shields, as the app uses each one (owner and Gemini, 2026-10-05):
// Scale Shield = the 10 days after touchdown, Fluid Shield = the week before a period,
// Rebound Shield = the six-week reverse diet. No line here may promise a result.
export default function Shields() {
  return (
    <section id="shields" className="relative">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-4 sm:px-8">
        <h2 className="font-display text-[34px] leading-[1.05] text-white sm:text-[44px]">{shields.heading}</h2>
        <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-white/60">{shields.intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {shields.items.map((s) => (
            <div key={s.name} className="rounded-2xl border hairline bg-white/[0.02] px-5 py-5">
              <div className="font-mono text-[10px] tracking-[0.16em] text-gold/80">{s.when.toUpperCase()}</div>
              <h3 className="mt-2 font-display text-[26px] leading-tight text-champagne">{s.name}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
