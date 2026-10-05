import type { Metadata } from "next";
import LegalDocument from "@/app/components/LegalDocument";
import { LEGAL } from "@/app/legal/documents";

export const metadata: Metadata = {
  title: "Privacy Policy | Directive",
  description: "What information the Directive app and website handle, and what happens to it.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={LEGAL.privacy} />;
}
