import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono, Jost, Roboto_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Starfield from "./components/Starfield";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// The app's own three typefaces, used only inside the demos so they read like the app (theme.ts: Jost, Roboto Mono, Space Grotesk).
const appSans = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-app-sans" });
const appMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-app-mono" });
const appNum = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-app-num" });

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
