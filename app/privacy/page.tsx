import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Directive",
  description:
    "How Directive collects, uses, and protects biometric and health data, including HealthKit and Health Connect data.",
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

export default function PrivacyPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 font-display text-[44px] leading-tight text-white">
        Privacy Policy
      </h1>
      <p className="mt-2 text-[13px] text-white/40">
        Last updated: September 24, 2026
      </p>

      <Section title="What we collect">
        <p>
          Directive reads biometric data — scale weight, resting heart rate,
          and active energy — strictly to power on-device body composition
          telemetry: fluid-decoupled dry mass tracking, Net-MET burn
          correction, and your Mission Control dashboard.
        </p>
        <p>
          With your explicit permission, this data is sourced from Apple
          HealthKit and Google Health Connect. You control exactly which
          data types Directive can read through your device's native health
          permissions screen, and you can revoke access at any time in
          Settings.
        </p>
      </Section>

      <Section title="How we use it">
        <p>
          Biometric data is used exclusively to calculate your body
          composition telemetry: separating extracellular fluid shifts from
          true dry-tissue change, modeling conservative net calorie burn,
          and generating your flight-path projections.
        </p>
      </Section>

      <Section title="What we never do">
        <p>
          Directive never sells health or biometric data to third parties,
          never transfers it to data brokers, and never uses it for
          advertising or marketing — for you or anyone else. Health data
          collected through HealthKit or Health Connect is never used for
          purposes outside the health and telemetry features described in
          this policy, in accordance with Apple and Google platform
          requirements.
        </p>
      </Section>

      <Section title="Data storage and security">
        <p>
          Telemetry is encrypted in transit and at rest. Access is limited
          to the systems required to compute and display your dashboard.
        </p>
      </Section>

      <Section title="Account and data deletion">
        <p>
          You can purge your profile and request permanent deletion of all
          stored telemetry at any time from Settings → Account → Delete
          Account, or by contacting{" "}
          <a
            href="mailto:privacy@directive.app"
            className="text-gold hover:underline"
          >
            privacy@directive.app
          </a>
          . Deletion requests are processed within 30 days, and all
          associated biometric records, logs, and derived telemetry are
          permanently removed from our systems.
        </p>
      </Section>

      <Section title="Children's privacy">
        <p>
          Directive is not directed at children under 16 and does not
          knowingly collect data from them.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We'll update the date above whenever this policy changes, and
          notify you in-app for material changes affecting how health data
          is handled.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about this policy: <br />
          <a
            href="mailto:privacy@directive.app"
            className="text-gold hover:underline"
          >
            privacy@directive.app
          </a>
        </p>
      </Section>
    </main>
  );
}
