import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://directive.app"),
  title: "DIRECTIVE — Precision Body Composition Telemetry",
  description:
    "Directive decouples water weight from true tissue loss, corrects phantom workout calories with Net-MET math, and replaces tracking neurosis with a tactile 6×6 portion matrix. Apply for 2026 Charter Access.",
  openGraph: {
    title: "DIRECTIVE — Precision Body Composition Telemetry",
    description:
      "Mission Control for your body. Fluid-decoupled telemetry, Net-MET burn correction, and a cognitive off-ramp from barcode tracking.",
    type: "website",
    siteName: "Directive",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIRECTIVE — Precision Body Composition Telemetry",
    description:
      "Stop letting water weight panic and phantom calories crash your flight plan.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030612",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-obsidian">
      <body className="bg-obsidian text-white antialiased">{children}</body>
    </html>
  );
}
