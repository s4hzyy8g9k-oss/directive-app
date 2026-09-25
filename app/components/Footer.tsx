import Image from "next/image";
import Link from "next/link";
import { footer } from "@/app/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-space">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/icon.png" alt="" width={24} height={24} className="rounded-[6px] ring-1 ring-gold/25" />
            <span className="text-[13px] font-semibold tracking-[0.3em] text-white">DIRECTIVE</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.badges.map((b) => (
              <span key={b} className="flex items-center gap-2 text-[12.5px] text-white/50">
                <span className="h-1 w-1 rounded-full bg-gold" />
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-[12.5px] leading-relaxed text-white/35">{footer.disclaimer}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] text-white/55 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-[13px] text-white/55 hover:text-white">Terms</Link>
            <Link href="/support" className="text-[13px] text-white/55 hover:text-white">Support</Link>
          </div>
        </div>
        <p className="mt-8 text-[11.5px] text-white/25">© {new Date().getFullYear()} Directive</p>
      </div>
    </footer>
  );
}
