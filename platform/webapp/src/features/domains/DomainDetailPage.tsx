import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EvidenceCappedScore } from "@/components/EvidenceCappedScore";
import { ValidityClockRow } from "@/components/ValidityClockRow";
import {
  DOMAIN_LABELS,
  domainScores,
  evidenceForDomain,
  findingsForDomain,
  isDomainKey,
} from "@/lib/demo-data";

export function DomainDetailPage() {
  const { domainKey } = useParams();
  const score = domainScores.find((item) => item.domain === domainKey);
  const [proposed, setProposed] = useState(score?.score ?? 1);

  const evidence = useMemo(
    () => (isDomainKey(domainKey) ? evidenceForDomain(domainKey) : []),
    [domainKey],
  );
  const domainFindings = useMemo(
    () => (isDomainKey(domainKey) ? findingsForDomain(domainKey) : []),
    [domainKey],
  );

  if (!score || !isDomainKey(domainKey)) {
    return (
      <p className="text-sm text-[color:var(--color-muted)]">
        Unknown domain. <Link to="/">Return to posture</Link>
      </p>
    );
  }

  const valid = evidence.filter((item) => item.validity === "valid" || item.validity === "expiring");
  const lapsed = evidence.filter((item) => item.validity === "expired" || item.validity === "superseded");
  const open = domainFindings.filter((item) => item.state === "open" || item.state === "overdue");
  const blocked = proposed > score.cap.cap;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        <Link to="/" className="text-[color:var(--color-brand)]">
          Domain posture
        </Link>{" "}
        / {DOMAIN_LABELS[score.domain]}
      </p>
      <header className="grid gap-4 md:grid-cols-[16rem_1fr] md:items-start">
        <EvidenceCappedScore score={score} compact />
        <div>
          <h1 className="font-display text-3xl">{DOMAIN_LABELS[score.domain]}</h1>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">{score.narrative}</p>
          <p className="mt-3 font-mono text-xs text-[color:var(--color-seal)]">
            Ceiling: {score.cap.reason.replaceAll("_", " ")} · cap {score.cap.cap}
            {valid.length === 0 ? " · uncapped claim blocked" : ""}
          </p>
        </div>
      </header>

      <section>
        <h2 className="font-display text-lg">Valid evidence</h2>
        {valid.length === 0 ? (
          <p className="mt-2 text-sm text-[color:var(--color-seal-red)]">
            No valid evidence. Score floored. Uncapped claim blocked.
          </p>
        ) : (
          <div className="mt-2">
            {valid.map((item) => (
              <ValidityClockRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg">Lapsed items</h2>
        <div className="mt-2">
          {lapsed.map((item) => (
            <ValidityClockRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg">Open findings suppressing score</h2>
        {open.length === 0 ? (
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">No open findings on this domain.</p>
        ) : (
          <ul className="mt-2 divide-y divide-[color:var(--color-rule)]">
            {open.map((finding) => (
              <li key={finding.id} className="py-2 text-sm">
                <span className="font-mono text-[11px] text-[color:var(--color-seal-red)]">{finding.id}</span>{" "}
                {finding.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border border-[color:var(--color-rule)] p-4">
        <h2 className="font-display text-lg">Propose score</h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          No user, including the CISO, may publish above the evidence cap.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="range"
            min={1}
            max={5}
            value={proposed}
            onChange={(event) => setProposed(Number(event.target.value))}
            className="w-48 accent-[color:var(--color-brand)]"
          />
          <span className="font-display text-2xl">{proposed}</span>
        </div>
        <p
          role="status"
          className={`mt-2 font-mono text-xs ${blocked ? "text-[color:var(--color-seal-red)]" : "text-[color:var(--color-trust)]"}`}
        >
          {blocked ? `Publish blocked — proposed ${proposed} exceeds cap ${score.cap.cap}.` : "Within cap."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/evidence" className="border border-[color:var(--color-brand)] px-3 py-1.5 text-sm text-[color:var(--color-brand)]">
            Attach evidence
          </Link>
          <Link to="/assets" className="border border-[color:var(--color-rule)] px-3 py-1.5 text-sm">
            Request re-attestation
          </Link>
          <Link to="/findings" className="border border-[color:var(--color-rule)] px-3 py-1.5 text-sm">
            Open finding
          </Link>
        </div>
      </section>
    </div>
  );
}
