import type { Metadata } from "next";
import Link from "next/link";
import SupportForm from "./SupportForm";

export const metadata: Metadata = {
  title: "Support — Directive",
  description: "Flight Operations support portal for Directive members.",
};

export default function SupportPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 font-display text-[44px] leading-tight text-white">
        Flight Operations
      </h1>
      <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-white/60">
        Questions about telemetry accuracy, Charter billing, HealthKit
        syncing, or account deletion — reach the team directly.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 border-y hairline py-6">
        <a
          href="mailto:support@directive.app"
          className="text-[13px] text-gold hover:underline"
        >
          support@directive.app
        </a>
        <span className="text-[13px] text-white/30">
          Typical response time: under 24 hours
        </span>
      </div>

      <div className="mt-10">
        <SupportForm />
      </div>
    </main>
  );
}
