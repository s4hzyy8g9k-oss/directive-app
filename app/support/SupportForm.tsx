"use client";

import { useState } from "react";

const TOPICS = [
  "Telemetry accuracy",
  "HealthKit / Health Connect sync",
  "Charter billing",
  "Account & data deletion",
  "Other",
];

export default function SupportForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || message.trim().length === 0) return;
    // Wire this up to your support inbox / ticketing endpoint.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-md border hairline bg-slate-deep/50 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold">
          ✓
        </div>
        <h2 className="mt-4 text-[16px] font-semibold text-white">
          Inquiry received
        </h2>
        <p className="mt-2 text-[13.5px] text-white/60">
          Flight Operations will reply to {email} within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-md border hairline bg-slate-deep/40 p-6"
    >
      <div>
        <label className="text-[12px] font-medium text-white/50">
          Topic
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1.5 w-full rounded-sm border hairline bg-obsidian px-3.5 py-3 text-[13.5px] text-white focus:border-gold/60"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[12px] font-medium text-white/50">
          Email address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-sm border hairline bg-obsidian px-3.5 py-3 text-[13.5px] text-white placeholder:text-white/30 focus:border-gold/60"
        />
      </div>

      <div>
        <label className="text-[12px] font-medium text-white/50">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the issue..."
          className="mt-1.5 w-full resize-none rounded-sm border hairline bg-obsidian px-3.5 py-3 text-[13.5px] text-white placeholder:text-white/30 focus:border-gold/60"
        />
      </div>

      <button
        type="submit"
        className="rounded-sm bg-gold px-6 py-3 text-[13px] font-semibold tracking-wide text-obsidian transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Send inquiry
      </button>
    </form>
  );
}
