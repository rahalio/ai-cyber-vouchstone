import { CommitteeRuleDiff } from "@/components/CommitteeRuleDiff";
import { DOMAIN_LABELS, EVIDENCE_TYPE_LABELS, governanceSettings, org, ruleDiffs } from "@/lib/demo-data";

export function GovernancePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Owned by {governanceSettings.ownedBy.replaceAll("_", " ")}
        </p>
        <h1 className="font-display text-3xl">Committee governance</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Decay rules, weightings, and caps. The scored party may propose; it may not edit.
        </p>
      </header>

      <p className="border border-[color:var(--color-rule)] px-3 py-2 text-sm text-[color:var(--color-muted)]">
        Security-function writes are denied and audited. Approver on record: {org.committeeChair}.
      </p>

      <section>
        <h2 className="font-display text-lg">Validity rules</h2>
        <ul className="mt-3 divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
          {governanceSettings.validityRules.map((rule) => (
            <li key={rule.evidenceTypeKey} className="flex justify-between py-2 text-sm">
              <span>{EVIDENCE_TYPE_LABELS[rule.evidenceTypeKey] ?? rule.evidenceTypeKey}</span>
              <span className="font-mono text-xs">{rule.validityDays} days · set by {rule.setBy}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-xs text-[color:var(--color-muted)]">
          Cap on open critical finding {governanceSettings.capOnOpenCriticalFinding} · stale attestation{" "}
          {governanceSettings.capOnStaleAttestation}
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg">Impact preview on current scores</h2>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Equal domain weightings ({(1 / 7).toFixed(3)} each). Shortening coverage-scan validity to 90 days is what put
          risk exposure and resilience into the Q4 lapse strip.
        </p>
        <ul className="mt-3 font-mono text-[11px] text-[color:var(--color-muted)]">
          {governanceSettings.domainWeightings.map((row) => (
            <li key={row.domain}>
              {DOMAIN_LABELS[row.domain]} · {(row.weighting * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg">Change log</h2>
        {ruleDiffs.map((diff) => (
          <CommitteeRuleDiff key={diff.id} diff={diff} />
        ))}
      </section>
    </div>
  );
}
