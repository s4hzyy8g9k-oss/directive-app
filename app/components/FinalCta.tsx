import Image from "next/image";
import { finalCta } from "@/app/content";

const SIDE_FADE = "linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)";
const TOP_FADE = "linear-gradient(to bottom, transparent 0%, black 14%, black 100%)";

export default function FinalCta({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-3xl px-5 pb-6 pt-24 text-center sm:px-8 sm:pt-32">
        <h2 className="font-display text-[44px] leading-[1.02] text-white sm:text-[68px]">{finalCta.heading}</h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-[16.5px] leading-relaxed text-white/65">{finalCta.body}</p>
        <button
          onClick={onApply}
          className="mt-10 rounded-full bg-gradient-to-b from-[#F1DC9A] via-gold to-[#B8932C] px-9 py-4 text-[15px] font-semibold text-obsidian shadow-[0_12px_50px_-10px_rgba(212,175,55,0.8)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {finalCta.cta}
        </button>
      </div>

      {/* Moon banner: logo over the Moon, the closing bookend to the Earth banner at the top. */}
      <div className="relative mx-auto mt-8 w-full max-w-[1400px] sm:mt-4">
        <div style={{ WebkitMaskImage: SIDE_FADE, maskImage: SIDE_FADE }}>
          <div
            className="relative aspect-[5/4] w-full sm:aspect-[16/9]"
            style={{ WebkitMaskImage: TOP_FADE, maskImage: TOP_FADE }}
          >
            <Image
              src="/brand/footer-moon.webp"
              alt="Directive — Precision Body Composition Engine"
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
