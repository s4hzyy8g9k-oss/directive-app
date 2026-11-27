import type { Metadata } from "next";
import Link from "next/link";
import StoreButtons from "@/app/components/StoreButtons";
import DownloadContent from "@/app/download/DownloadContent";
import CopyCode from "./CopyCode";

// Shared recipe, meal or food link: directivefitness.com/r/K7M9P2.
// With Directive installed, the phone opens the app straight to IMPORT (Universal Links / App Links, see
// public/.well-known). Otherwise this page shows the code to type in IMPORT. Nothing is looked up on the server
// and the recipe itself is never shown here. Spec: project-docs/launch/WEBSITE_LINKS.md in the app repo.

const CODE_RE = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;

export const metadata: Metadata = {
  title: "Shared in Directive | Directive",
  description: "Someone shared a recipe with you in Directive.",
  robots: { index: false, follow: false },
};

export default async function SharedCodePage({ params }: { params: Promise<{ code: string }> }) {
  const code = (await params).code.toUpperCase();
  const valid = CODE_RE.test(code);

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      {valid ? (
        <>
          <h1 className="mt-6 font-display text-[36px] leading-tight text-white sm:text-[40px]">Someone shared a recipe with you in Directive.</h1>
          <div className="mt-8">
            <CopyCode code={code} />
          </div>
          <p className="mt-4 max-w-[56ch] text-[14.5px] leading-relaxed text-white/70">
            Install Directive, then tap the code to import it, or type it in IMPORT.
          </p>
          <div className="mt-8">
            <StoreButtons />
          </div>
          <a href={`directive://share/${code}`} className="mt-4 flex w-full items-center justify-center rounded border border-gold/60 px-5 py-4 text-[14px] font-semibold tracking-[0.08em] text-gold hover:bg-gold/10 sm:inline-flex sm:w-auto">
            OPEN IN DIRECTIVE
          </a>
        </>
      ) : (
        <DownloadContent />
      )}
    </main>
  );
}
