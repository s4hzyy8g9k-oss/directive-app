import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL, LEGAL_EFFECTIVE, LEGAL_PREVIOUS } from "@/app/legal/documents";

export const metadata: Metadata = {
  title: "Terms of Service | Directive",
  description: "The Terms of Service for the Directive app and website.",
};

export default function TermsPage() {
  // While a change is pending, this page shows the new version and links to the one still in force.
  const notice = LEGAL_PREVIOUS.terms
    ? { text: `This version takes effect on ${LEGAL_EFFECTIVE}. Until then, the earlier version applies.`, linkText: "Read the earlier version", href: "/terms/previous" }
    : undefined;
  return <LegalDocument doc={LEGAL.terms} notice={notice} />;
}
