import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL_EFFECTIVE, LEGAL_PREVIOUS } from "@/app/legal/documents";

// The version still in force while a new one is pending. Made from the documents, like the main page.
export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Policy (earlier version) | Directive",
  robots: { index: false },
};

export default function PreviousConsumerHealthDataPrivacyPolicyPage() {
  const doc = LEGAL_PREVIOUS.health;
  if (!doc) notFound();
  return (
    <LegalDocument
      doc={doc}
      notice={{ text: `This version applies until ${LEGAL_EFFECTIVE}.`, linkText: "Read the version that takes effect then", href: "/consumer-health-data-privacy-policy" }}
    />
  );
}
