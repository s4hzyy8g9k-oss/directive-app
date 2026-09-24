"use client";

import { useState } from "react";

export default function Nav({ onApply }: { onApply: () => void }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#telemetry", label: "Telemetry" },
    { href: "#physiology", label: "Physiology" },
    { href: "#stations", label: "Stations" },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b hairline bg-obsidian/85 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-semibold tracking-[0.28em] text-white">
            DIRECTIVE
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border hairline px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/70 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
            </span>
            Charter intake open
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onApply}
            className="rounded-sm bg-gold px-4 py-2 text-[12px] font-semibold tracking-wide text-obsidian transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-5"
          >
            Apply for Charter Access
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-sm border hairline md:hidden"
          >
            <div className="space-y-1">
              <span className="block h-px w-4 bg-white/80" />
              <span className="block h-px w-4 bg-white/80" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t hairline px-5 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-white/75"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
