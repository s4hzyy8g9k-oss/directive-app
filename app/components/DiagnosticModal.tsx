"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { modal } from "@/app/content";

export default function DiagnosticModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ goal?: string; friction?: string }>({});
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setAnswers({});
      setEmail("");
      setError("");
      setDone(false);
    }, 300);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a full email address, like you@email.com.");
      return;
    }
    // TODO: POST { email, ...answers } to your email-capture endpoint.
    setDone(true);
  };

  const option = (label: string, onPick: () => void) => (
    <button
      key={label}
      onClick={onPick}
      className="w-full rounded-2xl border hairline bg-white/[0.02] px-5 py-4 text-left text-[15px] text-white/85 transition-colors hover:border-gold/60 hover:bg-gold/[0.06]"
    >
      {label}
    </button>
  );

  const slide = { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.22 } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-space/80 backdrop-blur-md sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Charter application"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="bezel w-full max-w-md rounded-t-[26px] sm:rounded-[26px]"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <div className="flex items-center gap-2">
                <Image src="/brand/icon.png" alt="" width={20} height={20} className="rounded-[5px] ring-1 ring-gold/25" />
                <span className="text-[12.5px] text-white/50">{done ? "Complete" : `Step ${step} of 3`}</span>
              </div>
              <button onClick={close} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/5 hover:text-white">
                ✕
              </button>
            </div>
            <div className="mx-6 mt-3 flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`h-[3px] flex-1 rounded-full transition-colors ${done || n <= step ? "bg-gold" : "bg-white/10"}`} />
              ))}
            </div>

            <div className="px-6 pb-8 pt-7">
              <AnimatePresence mode="wait">
                {!done && step === 1 && (
                  <motion.div key="1" {...slide}>
                    <h3 className="font-display text-[28px] leading-tight text-white">{modal.step1.question}</h3>
                    <div className="mt-6 space-y-2.5">
                      {modal.step1.options.map((o) => option(o, () => { setAnswers((a) => ({ ...a, goal: o })); setStep(2); }))}
                    </div>
                  </motion.div>
                )}
                {!done && step === 2 && (
                  <motion.div key="2" {...slide}>
                    <h3 className="font-display text-[28px] leading-tight text-white">{modal.step2.question}</h3>
                    <div className="mt-6 space-y-2.5">
                      {modal.step2.options.map((o) => option(o, () => { setAnswers((a) => ({ ...a, friction: o })); setStep(3); }))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-5 text-[13px] text-white/45 hover:text-white/80">Back</button>
                  </motion.div>
                )}
                {!done && step === 3 && (
                  <motion.div key="3" {...slide}>
                    <h3 className="font-display text-[28px] leading-tight text-white">{modal.step3.heading}</h3>
                    <p className="mt-2 text-[14.5px] text-white/55">{modal.step3.body}</p>
                    <form onSubmit={submit} noValidate className="mt-6">
                      <input
                        type="email"
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder={modal.step3.placeholder}
                        aria-invalid={!!error}
                        className="w-full rounded-2xl border hairline bg-space/70 px-5 py-4 text-[16px] text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none"
                      />
                      {error && <p className="mt-2 text-[13px] text-coral">{error}</p>}
                      <button type="submit" className="mt-4 w-full rounded-full bg-gradient-to-b from-[#F1DC9A] via-gold to-[#B8932C] py-4 text-[15px] font-semibold text-obsidian">
                        {modal.step3.button}
                      </button>
                    </form>
                    <button onClick={() => setStep(2)} className="mt-5 text-[13px] text-white/45 hover:text-white/80">Back</button>
                  </motion.div>
                )}
                {done && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-2 text-center">
                    <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16" aria-hidden>
                      <circle cx="32" cy="32" r="30" fill="none" stroke="#D4AF37" strokeOpacity="0.5" />
                      <motion.path d="M20 33 l8 8 l16 -18" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.1 }} />
                    </svg>
                    <h3 className="mt-5 font-display text-[28px] text-white">{modal.done.heading}</h3>
                    <p className="mt-2 text-[14.5px] text-white/60">{modal.done.body}</p>
                    <button onClick={close} className="mt-7 rounded-full border hairline px-6 py-2.5 text-[13.5px] text-white/75 hover:border-white/30">Close</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
