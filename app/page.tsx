"use client";

import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Traps from "./components/Traps";
import Pillars from "./components/Pillars";
import Stations from "./components/Stations";
import DiagnosticModal from "./components/DiagnosticModal";
import Footer from "./components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <Nav onApply={() => setModalOpen(true)} />
      <Hero onApply={() => setModalOpen(true)} />
      <Traps />
      <Pillars />
      <Stations />
      <Footer />
      <DiagnosticModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
