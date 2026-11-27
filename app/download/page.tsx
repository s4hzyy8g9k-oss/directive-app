import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/app/seo";
import { stores } from "@/app/content";

// One link for every "download the app" button, video end card and post: directivefitness.com/download.
// iPhone and iPad go straight to the App Store, Android straight to Google Play, and anything else
// (a computer, or a store that isn't live yet) sees this page with both buttons.

export const metadata: Metadata = pageMetadata({
  path: "/download",
  title: "Get Directive | Directive",
  description: "Download Directive Fitness for iPhone from the App Store or for Android from Google Play.",
});

export const dynamic = "force-dynamic";

function platform(ua: string): "ios" | "android" | "other" {
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  // iPadOS asks for the desktop site and reports itself as a Mac; touch support tells it apart, but that needs the
  // browser, so a Mac user agent falls through to this page, which still shows the App Store button.
  return "other";
}

const btn =
  "flex w-full items-center justify-center gap-3 rounded border px-5 py-4 text-[14px] font-semibold tracking-[0.08em] sm:w-auto";

export default async function DownloadPage() {
  const ua = (await headers()).get("user-agent") ?? "";
  const p = platform(ua);
  if (p === "ios" && stores.appStore) redirect(stores.appStore);
  if (p === "android" && stores.googlePlay) redirect(stores.googlePlay);

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 font-display text-[40px] leading-tight text-white sm:text-[44px]">Get Directive</h1>
      <p className="mt-3 max-w-[56ch] text-[14.5px] leading-relaxed text-white/70">
        Directive Fitness, by Directive LLC, for iPhone and Android.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {stores.appStore ? (
          <a href={stores.appStore} className={`${btn} border-gold bg-gold text-space hover:brightness-110`}>
            DOWNLOAD ON THE APP STORE
          </a>
        ) : (
          <span className={`${btn} border-white/15 text-white/50`}>APP STORE: COMING SOON</span>
        )}
        {stores.googlePlay ? (
          <a href={stores.googlePlay} className={`${btn} border-gold bg-gold text-space hover:brightness-110`}>
            GET IT ON GOOGLE PLAY
          </a>
        ) : (
          <span className={`${btn} border-white/15 text-white/50`}>GOOGLE PLAY: COMING SOON</span>
        )}
      </div>
    </main>
  );
}
