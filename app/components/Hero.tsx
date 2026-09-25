"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import DecouplingDemo from "./DecouplingDemo";
import { hero } from "@/app/content";

export default function Hero({ onApply }: { onApply: () => void }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] as const } };

  return (
    <section id="how-it-works" className="relative">
      {/* horizon glow behind the instrument */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[38%] h-[520px] bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(212,175,55,0.14),rgba(56,189,248,0.05)_45%,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...rise(0)} className="mx-auto w-[220px] sm:w-[280px]">
            <Image
              src="/brand/lockup.png"
              alt="Directive — Precision Body Composition Engine"
              width={613}
              height={287}
              priority
              className="w-full"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, black 55%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 75% 70% at 50% 45%, black 55%, transparent 100%)",
              }}
            />
          </motion.div>

          <motion.div {...rise(0.06)} className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
            <span className="text-[12.5px] text-champagne/90">{hero.kicker}</span>
          </motion.div>

          <motion.h1
            {...rise(0.12)}
            className="mt-7 font-display text-[44px] leading-[1.02] tracking-[-0.01em] text-white sm:text-[64px] lg:text-[78px]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p {...rise(0.28)} className="mx-auto mt-6 max-w-[56ch] text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {hero.subhead}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onApply}
              className="w-full rounded-full bg-gradient-to-b from-[#F1DC9A] via-gold to-[#B8932C] px-7 py-3.5 text-[14.5px] font-semibold text-obsidian shadow-[0_10px_40px_-10px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              {hero.primaryCta}
            </button>
            <a
              href="#stations"
              className="w-full rounded-full border hairline bg-white/[0.03] px-7 py-3.5 text-[14.5px] text-white/80 transition-colors hover:border-champagne/40 hover:text-white sm:w-auto"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-10 sm:mt-10"
        >
          <DecouplingDemo />
        </motion.div>
      </div>
    </section>
  );
}
