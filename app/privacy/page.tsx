import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL, LEGAL_EFFECTIVE, LEGAL_PREVIOUS } from "@/app/legal/documents";

export const metadata: Metadata = {
  title: "Privacy Policy | Directive",
  description: "What information the Directive app and website handle, and what happens to it.",
};

export default function PrivacyPage() {
  // While a change is pending, this page shows the new version and links to the one still in force.
  const notice = LEGAL_PREVIOUS.privacy
    ? { text: `This version takes effect on ${LEGAL_EFFECTIVE}. Until then, the earlier version applies.`, linkText: "Read the earlier version", href: "/privacy/previous" }
    : undefined;
  return <LegalDocument doc={LEGAL.privacy} notice={notice} />;
}
