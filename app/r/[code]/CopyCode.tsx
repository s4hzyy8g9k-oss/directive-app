"use client";

import { useState } from "react";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="font-mono text-[44px] font-semibold tracking-[0.18em] text-white sm:text-[52px]" aria-label={`Code ${code.split("").join(" ")}`}>
        {code}
      </span>
      <button type="button" onClick={copy} className="rounded border border-gold/60 px-4 py-2 text-[12.5px] font-semibold tracking-[0.12em] text-gold hover:bg-gold/10">
        {copied ? "COPIED" : "COPY CODE"}
      </button>
    </div>
  );
}
