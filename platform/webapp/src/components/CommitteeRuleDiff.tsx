import { formatDateTime, type RuleDiff } from "@/lib/demo-data";

export function CommitteeRuleDiff({ diff }: { diff: RuleDiff }) {
  return (
    <article className="border-b border-[color:var(--color-rule)] py-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
        {diff.id} · {diff.approval.minuteReference}
      </p>
      <p className="mt-1 font-display text-base">
        <span className="font-mono text-sm text-[color:var(--color-seal-dim)]">{diff.previous}</span>
        <span className="mx-2 text-[color:var(--color-muted)]">→</span>
        <span className="font-mono text-sm text-[color:var(--color-brand)]">{diff.next}</span>
      </p>
      <p className="mt-1 text-sm text-[color:var(--color-parchment)]">{diff.setting}</p>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">{diff.approval.rationale}</p>
      <p className="mt-2 font-mono text-[11px] text-[color:var(--color-trust)]">
        Approved {formatDateTime(diff.approval.approvedAt)} · {diff.approval.approvedBy} · {diff.approval.approverRole}
      </p>
    </article>
  );
}
