import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/app/seo";
import { stores } from "@/app/content";
import { platform } from "@/app/components/StoreButtons";
import DownloadContent from "./DownloadContent";

// One link for every "download the app" button, video end card, post and the app's own share card:
// directivefitness.com/download. iPhone and iPad go straight to the App Store, Android straight to Google Play,
// and anything else (a computer, or a store that isn't live yet) sees this page with both buttons and a QR code.
// iPadOS can report itself as a Mac; it then sees this page, which still has the App Store button.

export const metadata: Metadata = pageMetadata({
  path: "/download",
  title: "Get Directive | Directive",
  description: "Download Directive Fitness for iPhone from the App Store or for Android from Google Play.",
});

export const dynamic = "force-dynamic";

export default async function DownloadPage() {
  const p = platform((await headers()).get("user-agent") ?? "");
  if (p === "ios" && stores.appStore) redirect(stores.appStore);
  if (p === "android" && stores.googlePlay) redirect(stores.googlePlay);

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <DownloadContent />
    </main>
  );
}
