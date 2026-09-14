import { Link } from "react-router-dom";
import { AllocationDivergenceBanner } from "@/components/AllocationDivergenceBanner";
import { BrandMark } from "@/components/BrandMark";
import { EvidenceCappedScore } from "@/components/EvidenceCappedScore";
import { LapseForecastStrip } from "@/components/LapseForecastStrip";
import {
  domainScores,
  findings,
  openFindings,
  org,
  overallEvidenceBackedShare,
} from "@/lib/demo-data";

export function DomainPosturePage() {
  const backed = Math.round(overallEvidenceBackedShare() * 100);
  const asserted = Math.round(
    (domainScores.reduce((sum, score) => sum + score.claimedScore, 0) / (domainScores.length * 5)) * 100,
  );
  const suppressing = openFindings.filter((finding) => finding.suppressingDomainScore);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <BrandMark className="text-sm tracking-[0.28em]" />
          <h1 className="mt-2 font-display text-3xl text-[color:var(--color-parchment)]">Domain posture</h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            Seven domains scored only up to evidence caps. Establishing an evidenced floor — not a performance verdict.
          </p>
        </div>
        <p className="font-mono text-xs text-[color:var(--color-brand)]">
          {org.name} · {org.statementPeriod} statement · Draft · awaiting {org.ciso}
        </p>
      </header>

      <AllocationDivergenceBanner />

      <section>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg">Evidence-capped scores</h2>
          <p className="font-mono text-[11px] text-[color:var(--color-muted)]">
            Backed {backed}% · asserted {asserted}% of a painted 5
          </p>
        </div>
        <div className="mb-4 h-2 bg-[color:var(--color-ink)]" aria-hidden>
          <div className="relative h-2">
            <div className="absolute inset-y-0 left-0 bg-[color:var(--color-seal)]" style={{ width: `${backed}%` }} />
            <div
              className="absolute inset-y-0 left-0 border-r border-[color:var(--color-parchment)]/40"
              style={{ width: `${asserted}%` }}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {domainScores.map((score) => (
            <EvidenceCappedScore key={score.domain} score={score} />
          ))}
        </div>
      </section>

      <LapseForecastStrip />

      <section>
        <h2 className="font-display text-lg">Open-finding suppression</h2>
        <ul className="mt-3 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
          {suppressing.map((finding) => (
            <li key={finding.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
              <span>
                <span className="mr-2 font-mono text-[11px] text-[color:var(--color-seal-red)]">{finding.id}</span>
                {finding.title}
              </span>
              <span className="font-mono text-[11px] text-[color:var(--color-muted)]">
                {finding.state} · due {finding.dueDate}
              </span>
            </li>
          ))}
        </ul>
        {findings.filter((f) => f.state === "closed").length > 0 && (
          <p className="mt-2 font-mono text-[11px] text-[color:var(--color-muted)]">
            Last closure {findings.find((f) => f.closedAt)?.closedAt?.slice(0, 10)}
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/evidence"
          className="border border-[color:var(--color-brand)] px-4 py-2 text-sm text-[color:var(--color-brand)]"
        >
          Commission evidence
        </Link>
        <Link
          to="/assurance"
          className="bg-[color:var(--color-brand)] px-4 py-2 text-sm text-[color:var(--color-ink)]"
        >
          Draft assurance statement
        </Link>
      </div>
    </div>
  );
}
