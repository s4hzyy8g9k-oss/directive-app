import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Starfield from "./components/Starfield";

// Fonts are served from app/fonts (the same Google Fonts files, latin subset) so the build doesn't need to reach
// Google Fonts. Vercel builds were failing on "Failed to fetch font file" (2026-11-03 onward).
const display = localFont({
  src: [
    { path: "./fonts/instrument-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
});
const sans = localFont({ src: "./fonts/manrope.woff2", weight: "200 800", variable: "--font-sans" });
const mono = localFont({ src: "./fonts/jetbrains-mono.woff2", weight: "100 800", variable: "--font-mono" });
// The app's own three typefaces, used only inside the demos so they read like the app (theme.ts: Jost, Roboto Mono, Space Grotesk).
const appSans = localFont({ src: "./fonts/jost.woff2", weight: "100 900", variable: "--font-app-sans" });
const appMono = localFont({ src: "./fonts/roboto-mono.woff2", weight: "100 700", variable: "--font-app-mono" });
const appNum = localFont({ src: "./fonts/space-grotesk.woff2", weight: "300 700", variable: "--font-app-num" });

export const metadata: Metadata = {
  metadataBase: new URL("https://directivefitness.com"),
  title: "Directive: Mission Control for your body",
  description:
    "Directive separates likely water weight from your real trend, counts workout calories conservatively, and lets you log a meal in seconds. Apply for 2026 Charter access.",
  openGraph: {
    title: "Directive: Mission Control for your body",
    description: "The scale says you gained 2.8 pounds. Your body says you didn't.",
    type: "website",
    siteName: "Directive",
    images: [{ url: "/brand/banner.jpg", width: 1250, height: 378 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Directive: Mission Control for your body",
    description: "The scale says you gained 2.8 pounds. Your body says you didn't.",
    images: ["/brand/banner.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#02040C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} ${mono.variable} ${appSans.variable} ${appMono.variable} ${appNum.variable}`}>
      <body className="min-h-screen text-white antialiased">
        <Starfield />
        {children}
      </body>
    </html>
  );
}
