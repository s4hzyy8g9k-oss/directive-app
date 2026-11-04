import type { Metadata } from "next";
import HomePage from "./HomePage";
import { OG_IMAGE, SITE_NAME } from "./seo";

// The home page's canonical link and share card (the same wording as before). The page itself is in HomePage.tsx.
const SHARE_TITLE = "Directive: Mission Control for your body";
const SHARE_DESCRIPTION = "The scale says you gained 2.8 pounds. Your body says you didn't.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { title: SHARE_TITLE, description: SHARE_DESCRIPTION, url: "/", type: "website", siteName: SITE_NAME, locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [OG_IMAGE.url] },
};

export default function Page() {
  return <HomePage />;
}
