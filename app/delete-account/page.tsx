import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/app/seo";

// Account deletion page for Google Play's "delete account URL". It must name the app and developer,
// let someone ask for deletion without the app, and say what is deleted and what is kept.
// Keep it in step with the Privacy Policy (app/legal/documents.ts).

export const metadata: Metadata = pageMetadata({
  path: "/delete-account",
  title: "Delete your Directive account | Directive",
  description: "How to delete your Directive Fitness account and data, in the app or by email, and what is deleted and kept.",
});

const MAILTO = "mailto:privacy@directivefitness.com?subject=Delete%20my%20account";

const link = "text-champagne underline decoration-gold/40 underline-offset-2 [overflow-wrap:anywhere] hover:text-white";

export default function DeleteAccountPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 font-display text-[40px] leading-tight text-white sm:text-[44px]">Delete your Directive account</h1>
      <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-white/70">
        Directive Fitness is made by Directive LLC. Your health data is stored only on your phone, never on our servers. Your account
        holds only your sign-in (an account id and your email address) and any recipes you chose to share.
      </p>

      <div className="mt-8 rounded border hairline px-5 py-5">
        <h2 className="text-[15.5px] font-semibold text-white">Request deletion without the app</h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">
          Email{" "}
          <a href={MAILTO} className={link}>
            privacy@directivefitness.com
          </a>{" "}
          from the address you signed in with, subject <strong className="font-semibold text-white/90">&ldquo;Delete my account&rdquo;</strong>.
          We delete your account and shared recipes within 30 days and reply to confirm.
        </p>
        <a href={MAILTO} className="mt-4 inline-block rounded bg-gold px-5 py-2.5 text-[13px] font-semibold tracking-[0.12em] text-space hover:brightness-110">
          EMAIL A DELETION REQUEST
        </a>
      </div>

      <div className="mt-8 space-y-4 text-[14.5px] leading-relaxed text-white/70">
        <h2 className="border-t hairline pt-8 text-[18px] font-semibold text-white">Delete in the app</h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-gold/60">
          <li>
            Tap your profile, then <strong className="font-semibold text-white/90">Sign Out</strong>, then{" "}
            <strong className="font-semibold text-white/90">DELETE MY ACCOUNT</strong>.
          </li>
          <li>
            To also erase everything on your phone: <strong className="font-semibold text-white/90">Settings</strong>, then{" "}
            <strong className="font-semibold text-white/90">DELETE ALL MY DATA</strong>.
          </li>
        </ul>

        <h2 className="border-t hairline pt-8 text-[18px] font-semibold text-white">Subscriptions</h2>
        <p>
          Deleting your account does not cancel a subscription. Cancel it first at{" "}
          <a href="https://apps.apple.com/account/subscriptions" className={link}>
            apps.apple.com/account/subscriptions
          </a>{" "}
          (iPhone) or{" "}
          <a href="https://play.google.com/store/account/subscriptions" className={link}>
            play.google.com/store/account/subscriptions
          </a>{" "}
          (Android).
        </p>

        <h2 className="border-t hairline pt-8 text-[18px] font-semibold text-white">What is deleted and what is kept</h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-gold/60">
          <li>Deleted: your account id, your email address and any recipes you shared.</li>
          <li>Kept: nothing from your account, except purchase records the law requires, which Apple and Google hold.</li>
          <li>
            RevenueCat, which handles purchases for us, also keeps purchase records. Email{" "}
            <a href="mailto:privacy@directivefitness.com" className={link}>
              privacy@directivefitness.com
            </a>{" "}
            and we will ask it to delete yours.
          </li>
        </ul>
      </div>

      <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t hairline pt-6 text-[13px]">
        <Link href="/privacy" className="text-white/55 hover:text-white">Privacy Policy</Link>
        <Link href="/terms" className="text-white/55 hover:text-white">Terms of Service</Link>
        <Link href="/support" className="text-white/55 hover:text-white">Support</Link>
      </nav>
    </main>
  );
}
