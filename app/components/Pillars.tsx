"use client";

// Gemini web refinement pass (2026-11-05): on wide screens a sticky phone on the left cross-fades between app screens
// as the matching item scrolls past (Event Allowance, Rebound Shield, Protein comes first; later items keep the last
// screen). Phones and narrow screens show the list only, as before. Reduced motion switches screens without fading.
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pillars } from "@/app/content";
import { Phone } from "./TelemetryEngine";
import { EventAllowanceScreen, ProteinFloorScreen, ReboundShieldScreen } from "./PillarScreens";

const SCREENS = [EventAllowanceScreen, ReboundShieldScreen, ProteinFloorScreen];

export default function Pillars() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const Screen = SCREENS[Math.min(active, SCREENS.length - 1)];

  return (
    <section id="physiology" className="relative">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">{pillars.heading}</h2>
          <p className="mt-5 max-w-[40ch] text-[16.5px] leading-relaxed text-white/60">{pillars.intro}</p>
          <div className="mt-8 hidden max-w-[300px] lg:block" aria-hidden>
            <div className="-mb-[105px] origin-top-left scale-[0.83]">
              <Phone>
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={Math.min(active, SCREENS.length - 1)}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.45 }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </Phone>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {pillars.items.map((p, i) => (
            <motion.div key={p.title} className="py-7 sm:py-8" onViewportEnter={() => setActive(i)} viewport={{ margin: "-45% 0px -45% 0px" }}>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className={`font-display text-[26px] leading-tight transition-colors sm:text-[30px] ${i === active ? "text-champagne" : "text-champagne/70"}`}>{p.title}</h3>
              </div>
              <p className="mt-2.5 max-w-[58ch] text-[15px] leading-relaxed text-white/65">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
