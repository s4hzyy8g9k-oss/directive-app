"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const OBJECTIVES = [
  "Defend lean tissue & cut body fat",
  "Sarcopenia defense / GLP-1 protocol",
  "Recomp & athletic fueling",
];

const FRICTIONS = [
  "Water weight panic / scale noise",
  "Stalled deficits from inflated workout calories",
  "Cognitive burnout from food scales & barcodes",
];

export default function DiagnosticModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState<string | null>(null);
  const [friction, setFriction] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setStep(1);
    setObjective(null);
    setFriction(null);
    setEmail("");
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-obsidian/80 backdrop-blur-sm sm:items-center"
      onClick={handleClose}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-lg border hairline bg-slate-deep shadow-instrument sm:rounded-md"
      >
        <div className="flex items-center justify-between border-b hairline px-6 py-4">
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/50">
            CHARTER DIAGNOSTIC · STEP {Math.min(step, 3)} OF 3
          </span>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="text-white/40 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="h-0.5 w-full bg-hairline/40">
          <div
            className="h-0.5 bg-gold transition-all duration-300"
            style={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
          />
        </div>

        <div className="px-6 py-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-[17px] font-semibold text-white">
                  What is your primary operational objective?
                </h3>
                <div className="mt-5 space-y-2.5">
                  {OBJECTIVES.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setObjective(o);
                        setStep(2);
                      }}
                      className="w-full rounded-sm border hairline px-4 py-3.5 text-left text-[13.5px] text-white/80 transition-colors hover:border-gold/60 hover:bg-gold/5"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-[17px] font-semibold text-white">
                  What is your primary tracking friction?
                </h3>
                <div className="mt-5 space-y-2.5">
                  {FRICTIONS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setFriction(f);
                        setStep(3);
                      }}
                      className="w-full rounded-sm border hairline px-4 py-3.5 text-left text-[13.5px] text-white/80 transition-colors hover:border-gold/60 hover:bg-gold/5"
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-[12px] text-white/40 hover:text-white/70"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {step === 3 && !submitted && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-[17px] font-semibold text-white">
                  Charter registry key issuance
                </h3>
                <p className="mt-2 text-[13px] text-white/50">
                  Your diagnostic profile is logged. Enter your email to
                  receive Charter priority status.
                </p>
                <form onSubmit={submit} className="mt-5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your primary email address..."
                    className="w-full rounded-sm border hairline bg-obsidian px-4 py-3.5 text-[13.5px] text-white placeholder:text-white/30 focus:border-gold/60"
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full rounded-sm bg-gold py-3.5 text-[13px] font-semibold tracking-wide text-obsidian transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Submit Charter Application
                  </button>
                </form>
                <button
                  onClick={() => setStep(2)}
                  className="mt-4 text-[12px] text-white/40 hover:text-white/70"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {submitted && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="py-4 text-center"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold">
                  ✓
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-white">
                  Application logged
                </h3>
                <p className="mt-2 text-[13px] text-white/55">
                  Priority status assigned for 2026 Charter Intake.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-sm border hairline px-5 py-2.5 text-[12px] text-white/70 hover:border-white/30"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
