import Link from "next/link";

const BADGES = [
  "Native Apple HealthKit Integration",
  "Google Health Connect Ready",
  "Zero Data Brokering",
];

export default function Footer() {
  return (
    <footer className="border-t hairline bg-obsidian">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-8 border-b hairline pb-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13px] font-semibold tracking-[0.24em] text-white">
            DIRECTIVE
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 text-[11.5px] text-white/45"
              >
                <span className="h-1 w-1 rounded-full bg-gold/70" />
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[44ch] text-[12px] leading-relaxed text-white/35">
            Directive is an educational body-composition estimation and
            telemetry tool. It is not a medical diagnostic device and does
            not provide medical advice.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[12px] text-white/50 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-white/50 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="text-[12px] text-white/50 hover:text-white"
            >
              Support
            </Link>
          </div>
        </div>

        <p className="mt-8 font-mono text-[10px] text-white/25">
          © {new Date().getFullYear()} Directive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
