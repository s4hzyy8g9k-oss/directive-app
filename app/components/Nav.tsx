"use client";

import { useState } from "react";
import Image from "next/image";
import { nav } from "@/app/content";

export default function Nav({ onApply }: { onApply: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-space/70 backdrop-blur-xl" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/brand/icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-[7px] ring-1 ring-gold/25"
            priority
          />
          <span className="text-[14px] font-semibold tracking-[0.3em] text-white">DIRECTIVE</span>
          <span className="ml-1 hidden items-center gap-1.5 text-[11.5px] text-white/50 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80]" />
            {nav.status}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13.5px] text-white/60 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onApply}
            className="rounded-full bg-gold px-4 py-2 text-[12.5px] font-semibold text-obsidian transition-transform hover:scale-[1.03] active:scale-[0.97] sm:px-5"
          >
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">{nav.cta}</span>
          </button>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border hairline md:hidden"
          >
            <span className="space-y-1">
              <span className="block h-px w-4 bg-white/80" />
              <span className="block h-px w-4 bg-white/80" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/[0.06] px-5 py-3 md:hidden">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] text-white/75">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
