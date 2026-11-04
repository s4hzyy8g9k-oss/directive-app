import type { Metadata } from "next";

// Shared search and social-share settings. Every page passes its own path so that
// its canonical link and share card point at itself, not at the home page.
export const SITE_URL = "https://directivefitness.com";
export const SITE_NAME = "Directive";

export const OG_IMAGE = {
  url: "/brand/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Directive: Precision Body Composition Engine",
};

export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: SITE_NAME, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
