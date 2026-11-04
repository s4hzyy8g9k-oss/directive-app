"use client";

import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Traps from "./components/Traps";
import TelemetryEngine from "./components/TelemetryEngine";
import Pillars from "./components/Pillars";
import Shields from "./components/Shields";
import Stations from "./components/Stations";
import EcosystemBridge from "./components/EcosystemBridge";
import FinalCta from "./components/FinalCta";
import DiagnosticModal from "./components/DiagnosticModal";
import Footer from "./components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);
  const apply = () => setOpen(true);

  return (
    <>
      <div className="relative z-10">
        <Nav onApply={apply} />
        <main>
          <Hero onApply={apply} />
          <Traps />
          <TelemetryEngine />
          <Pillars />
          <Shields />
          <Stations />
          <EcosystemBridge />
          <FinalCta onApply={apply} />
        </main>
        <Footer />
      </div>
      <DiagnosticModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
