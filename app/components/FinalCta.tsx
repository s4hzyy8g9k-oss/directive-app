import { finalCta } from "@/app/content";

export default function FinalCta({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(212,175,55,0.22),rgba(56,189,248,0.06)_45%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-[-10%] bottom-[-340px] h-[420px] rounded-[50%] border-t border-champagne/30 bg-space shadow-[0_-20px_80px_-10px_rgba(212,175,55,0.35)]" />
      <div className="relative mx-auto max-w-3xl px-5 pb-40 pt-24 text-center sm:px-8 sm:pb-48 sm:pt-32">
        <h2 className="font-display text-[44px] leading-[1.02] text-white sm:text-[68px]">{finalCta.heading}</h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-[16.5px] leading-relaxed text-white/65">{finalCta.body}</p>
        <button
          onClick={onApply}
          className="mt-10 rounded-full bg-gradient-to-b from-[#F1DC9A] via-gold to-[#B8932C] px-9 py-4 text-[15px] font-semibold text-obsidian shadow-[0_12px_50px_-10px_rgba(212,175,55,0.8)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {finalCta.cta}
        </button>
      </div>
    </section>
  );
}
