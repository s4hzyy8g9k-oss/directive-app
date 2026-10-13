import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL, LEGAL_EFFECTIVE, LEGAL_PREVIOUS } from "@/app/legal/documents";

// The page the app's consent screen links to. Its link is always titled exactly
// "Consumer Health Data Privacy Policy" and is always separate from the Privacy Policy link.
export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Policy | Directive",
  description: "The health data Directive collects, why, where it goes, and your rights over it.",
};

export default function ConsumerHealthDataPrivacyPolicyPage() {
  // While a change is pending, this page shows the new version and links to the one still in force.
  const notice = LEGAL_PREVIOUS.health
    ? { text: `This version takes effect on ${LEGAL_EFFECTIVE}. Until then, the earlier version applies.`, linkText: "Read the earlier version", href: "/consumer-health-data-privacy-policy/previous" }
    : undefined;
  return <LegalDocument doc={LEGAL.health} notice={notice} />;
}
