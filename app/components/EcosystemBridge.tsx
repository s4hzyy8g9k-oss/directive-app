import Script from "next/script";

// Ecosystem bridge (Ray, 2026-11-04). Markup, ids, classes and data attributes follow Block 1 of
// docs/website/ecosystem-video-paste-ins.md in the directive-ecosystem repo. The CSS, JS, video and poster in
// public/media/ are copied from that repo byte for byte; don't edit them here, copy a new version instead.
// The video and the phone link are set as raw HTML so the page ships the `muted` attribute in its first HTML
// (React leaves it out when it renders on the server, and iPhone Safari only autoplays muted video).
const STAGE_HTML = `<video class="eb-video" autoplay loop muted playsinline preload="auto" width="1920" height="1080"
       poster="/media/ecosystem_story_poster.jpg"
       aria-label="Animation: one phone splits into Stratum Metrics and Directive; a sample week of workouts in Stratum Metrics lines up with Directive's daily fuel plan.">
  <source src="/media/ecosystem_story.webm" type="video/webm">
  <source src="/media/ecosystem_story.mp4" type="video/mp4">
</video>
<a class="eb-port" data-card="stratum" aria-label="Go to stratummetrics.com to see Stratum Metrics" href="https://stratummetrics.com/?from=directive#ecosystem-bridge">
  <span class="eb-prompt">[ INSPECT MECHANICAL SUBSTRATE: stratummetrics.com&nbsp;↗&nbsp;]</span>
</a>`;

const LINK = "https://stratummetrics.com/?from=directive#ecosystem-bridge";

export default function EcosystemBridge() {
  return (
    <>
      {/* Loaded on this page only. React hoists the stylesheet into <head>. */}
      <link rel="stylesheet" href="/media/ecosystem-bridge.css" precedence="default" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <section id="ecosystem-bridge" className="eb" data-site="directive" data-variant="story">
          <div
            className="eb-arrival"
            role="status"
            data-text-from-stratum="Arrived from Stratum Metrics · Here's the Directive side of the handoff"
          ></div>
          <span className="tag font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Coming with Stratum Metrics</span>
          <h2 className="mt-3 font-display text-[38px] leading-[1.05] text-white sm:text-[54px]">
            Training Strain Meets Fuel Recovery.
          </h2>
          <p className="sub mt-4 font-display text-[24px] leading-tight text-champagne sm:text-[28px]">
            Works with Stratum Metrics, on your phone.
          </p>
          <p className="mb-10 mt-5 max-w-[62ch] text-[16.5px] leading-relaxed text-white/60">
            {"Stop guessing what your workout burned. Save a workout in Stratum Metrics and it's handed over to Directive on your phone: tonnage, active time and effort, with no retyping. Directive counts the burn above resting, and when you train above your usual week, it adds a training credit to your fuel target, always shown as base + credit."}
          </p>
          <div className="eb-stage" dangerouslySetInnerHTML={{ __html: STAGE_HTML }} />
          <a className="eb-port-alt" data-card="stratum" href={LINK}>
            {"[ INSPECT MECHANICAL SUBSTRATE: stratummetrics.com ↗ ]"}
          </a>
          <a className="eb-cta" data-card="stratum" href={LINK}>
            EXPLORE STRATUM METRICS ➔
          </a>
          <p className="small mt-5 text-[13px] leading-relaxed text-white/60">
            {"Sample numbers. Your data stays on your phone; the apps don't use a server to talk to each other."}
          </p>
        </section>
      </div>
      {/* Runs once, after the section is on the page. */}
      <Script src="/media/ecosystem-bridge.js" strategy="afterInteractive" />
    </>
  );
}
