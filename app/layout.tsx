import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Starfield from "./components/Starfield";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://directive.app"),
  title: "Directive: Mission Control for your body",
  description:
    "Directive separates water weight from real tissue change, corrects inflated workout calories, and logs a meal in ten seconds. Apply for 2026 Charter access.",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen text-white antialiased">
        <Starfield />
        {children}
      </body>
    </html>
  );
}
