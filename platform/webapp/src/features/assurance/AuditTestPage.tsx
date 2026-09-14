import { useState } from "react";
import { DOMAIN_LABELS, evidenceItems, publishedStatement } from "@/lib/demo-data";

export function AuditTestPage() {
  const [selected] = useState(publishedStatement.id);
  const statement = selected === publishedStatement.id ? publishedStatement : null;

  if (!statement) {
    return <p className="text-sm text-[color:var(--color-muted)]">No published statements yet.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Internal audit · immutable snapshot
        </p>
        <h1 className="font-display text-3xl">Audit test view</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Re-open a published score against evidence validity on the publish date.
        </p>
      </header>

      <label className="block max-w-sm">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">Statement</span>
        <select
          value={selected}
          className="mt-1 w-full border border-[color:var(--color-rule)] bg-[color:var(--color-ink)] px-3 py-2"
          disabled
        >
          <option value={publishedStatement.id}>
            {publishedStatement.period} · {publishedStatement.id}
          </option>
        </select>
      </label>

      <p className="font-mono text-xs text-[color:var(--color-seal)]">
        Snapshot {statement.frozenEvidenceStateHash} · signed {statement.signedAt} by {statement.signedBy}
      </p>

      <table className="w-full text-left text-sm">
        <thead className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          <tr>
            <th className="py-2 font-normal">Claim</th>
            <th className="py-2 font-normal">Published</th>
            <th className="py-2 font-normal">Cap at freeze</th>
            <th className="py-2 font-normal">Test</th>
          </tr>
        </thead>
        <tbody>
          {statement.claims.map((claim) => {
            const live = evidenceItems.filter((item) => claim.supportingEvidenceIds.includes(item.id));
            const pass = claim.score <= claim.capAtPublication && live.length > 0;
            return (
              <tr key={claim.domain} className="border-t border-[color:var(--color-rule)]">
                <td className="py-3">{DOMAIN_LABELS[claim.domain]}</td>
                <td className="py-3 font-display text-lg">{claim.score}</td>
                <td className="py-3 font-mono text-xs">{claim.capAtPublication}</td>
                <td className={`py-3 font-mono text-xs ${pass ? "text-[color:var(--color-trust)]" : "text-[color:var(--color-seal-red)]"}`}>
                  {pass ? "Pass" : "Fail"} · {claim.supportingEvidenceIds.join(", ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
