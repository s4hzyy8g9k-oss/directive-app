import Link from "next/link";
import type { LegalDoc, Span } from "@/app/legal/documents";

// Shows one legal document exactly as written in legal-review/source files/.
// The wording lives in app/legal/documents.ts, which is made by "Website only/build-legal-pages.py".

const URL_RE = /(https?:\/\/[^\s)]+|[\w.+-]+@directivefitness\.com|directivefitness\.com\/[\w/-]+|reportaproblem\.apple\.com|support\.google\.com\/[\w/]+|www\.atg\.wa\.gov\/[\w-]+)/g;

function href(match: string) {
  if (match.includes("@")) return `mailto:${match}`;
  return match.startsWith("http") ? match : `https://${match}`;
}

function Text({ spans }: { spans: Span[] }) {
  return (
    <>
      {spans.map((s, i) => {
        const parts = s.t.split(URL_RE);
        const body = parts.map((part, j) =>
          j % 2 === 1 ? (
            <a key={j} href={href(part.replace(/[.,;]$/, ""))} className="text-champagne underline decoration-gold/40 underline-offset-2 hover:text-white">
              {part}
            </a>
          ) : (
            part
          )
        );
        return s.b ? (
          <strong key={i} className="font-semibold text-white/90">
            {body}
          </strong>
        ) : (
          <span key={i}>{body}</span>
        );
      })}
    </>
  );
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-[12px] text-white/40 hover:text-white/70">
        ← Directive
      </Link>
      <h1 className="mt-6 font-display text-[40px] leading-tight text-white sm:text-[44px]">{doc.title}</h1>
      {doc.updated && <p className="mt-2 text-[13px] text-white/40">Last updated: {doc.updated}</p>}

      <div className="mt-8 space-y-4 text-[14.5px] leading-relaxed text-white/70">
        {doc.blocks.map((b, i) => {
          if (b.k === "h") {
            return b.level <= 2 ? (
              <h2 key={i} className="border-t hairline pt-8 text-[18px] font-semibold text-white">
                {b.text}
              </h2>
            ) : (
              <h3 key={i} className="pt-2 text-[15.5px] font-semibold text-white/90">
                {b.text}
              </h3>
            );
          }
          if (b.k === "ul") {
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-gold/60">
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Text spans={item} />
                  </li>
                ))}
              </ul>
            );
          }
          if (b.k === "lines") {
            return (
              <p key={i}>
                {b.lines.map((line, j) => (
                  <span key={j} className="block">
                    <Text spans={line} />
                  </span>
                ))}
              </p>
            );
          }
          return (
            <p key={i}>
              <Text spans={b.s} />
            </p>
          );
        })}
      </div>

      <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t hairline pt-6 text-[13px]">
        <Link href="/terms" className="text-white/55 hover:text-white">Terms of Service</Link>
        <Link href="/privacy" className="text-white/55 hover:text-white">Privacy Policy</Link>
        <Link href="/consumer-health-data-privacy-policy" className="text-white/55 hover:text-white">Consumer Health Data Privacy Policy</Link>
        <Link href="/support" className="text-white/55 hover:text-white">Support</Link>
      </nav>
    </main>
  );
}
