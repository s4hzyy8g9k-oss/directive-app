import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Directive",
  description:
    "Terms of Service, Charter allocation rules, and medical disclaimer for Directive.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t hairline py-8">
      <h2 className="text-[17px] font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-white/65">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 text-[28px] font-semibold tracking-tight text-white">
        Terms of Service
      </h1>
      <p className="mt-2 text-[13px] text-white/40">
        Last updated: September 24, 2026
      </p>

      <Section title="Agreement to terms">
        <p>
          By creating a Directive account or applying for Charter Access,
          you agree to these Terms. If you don't agree, don't use the
          service.
        </p>
      </Section>

      <Section title="Medical disclaimer">
        <p>
          Directive is an educational body-composition estimation and
          telemetry tool. It is not a medical device, is not intended to
          diagnose, treat, cure, or prevent any disease, and is not a
          substitute for advice from a physician or other qualified
          healthcare provider. Always consult a healthcare professional
          before making significant changes to diet, exercise, or any
          treatment protocol, including GLP-1 or other prescribed therapies.
        </p>
      </Section>

      <Section title="Charter allocation">
        <p>
          Charter Access is issued in limited cohorts. Submitting a
          diagnostic application logs your registry key and assigns
          priority status for the current intake window; it does not
          guarantee immediate access. Directive may adjust intake volume or
          timing at its discretion.
        </p>
      </Section>

      <Section title="Your responsibilities">
        <p>
          You're responsible for the accuracy of the data you log, for
          keeping your account credentials secure, and for using Directive
          in accordance with applicable law.
        </p>
      </Section>

      <Section title="Subscriptions and billing">
        <p>
          Charter membership may include a paid subscription tier, billed
          through the Apple App Store or Google Play as applicable. Pricing,
          renewal, and cancellation terms are presented at the point of
          purchase and are governed by the respective platform's billing
          policies.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          You may cancel your account at any time. We may suspend or
          terminate accounts that violate these Terms or misuse the
          service.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          Directive is provided "as is." To the maximum extent permitted by
          law, Directive disclaims liability for outcomes related to diet,
          training, or health decisions made using the app's estimates and
          projections.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          We'll update the date above when these Terms change and notify
          you in-app of material updates.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          <a
            href="mailto:legal@directive.app"
            className="text-gold hover:underline"
          >
            legal@directive.app
          </a>
        </p>
      </Section>
    </main>
  );
}
