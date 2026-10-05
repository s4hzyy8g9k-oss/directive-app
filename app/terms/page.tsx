import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL } from "@/app/legal/documents";

export const metadata: Metadata = {
  title: "Terms of Service | Directive",
  description: "The Terms of Service for the Directive app and website.",
};

export default function TermsPage() {
  return <LegalDocument doc={LEGAL.terms} />;
}
