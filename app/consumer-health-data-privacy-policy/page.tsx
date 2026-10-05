import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL } from "@/app/legal/documents";

// The page the app's consent screen links to. Its link is always titled exactly
// "Consumer Health Data Privacy Policy" and is always separate from the Privacy Policy link.
export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Policy | Directive",
  description: "The health data Directive collects, why, where it goes, and your rights over it.",
};

export default function ConsumerHealthDataPrivacyPolicyPage() {
  return <LegalDocument doc={LEGAL.health} />;
}
