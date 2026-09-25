import { pillars } from "@/app/content";

export default function Pillars() {
  return (
    <section id="physiology" className="relative">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{pillars.heading}</h2>
          <p className="mt-5 max-w-[40ch] text-[16.5px] leading-relaxed text-white/60">{pillars.intro}</p>
          <div aria-hidden className="mt-10 hidden lg:block">
            <svg viewBox="0 0 200 200" className="h-44 w-44 opacity-80">
              <circle cx="100" cy="100" r="92" fill="none" stroke="#2A3B5C" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#2A3B5C" strokeDasharray="1 5" />
              <circle cx="100" cy="100" r="46" fill="none" stroke="#D4AF37" strokeOpacity="0.5" />
              <ellipse cx="100" cy="100" rx="92" ry="30" fill="none" stroke="#38BDF8" strokeOpacity="0.35" transform="rotate(-24 100 100)" />
              <circle cx="100" cy="100" r="4" fill="#D4AF37" />
              <circle cx="168" cy="72" r="3" fill="#38BDF8" />
              <circle cx="54" cy="135" r="2.5" fill="#F1DC9A" />
            </svg>
          </div>
        </div>

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {pillars.items.map((p) => (
            <div key={p.title} className="py-9">
              <h3 className="font-display text-[28px] leading-tight text-champagne sm:text-[32px]">{p.title}</h3>
              <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-white/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
