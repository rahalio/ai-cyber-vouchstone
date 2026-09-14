import { Link } from "react-router-dom";
import { THREAT_LABELS, allocation } from "@/lib/demo-data";

export function AllocationDivergenceBanner({
  reconciliation = allocation,
}: {
  reconciliation?: typeof allocation;
}) {
  if (!reconciliation.standingFindingRaised) return null;
  const [divergence] = reconciliation.divergences;

  return (
    <aside
      role="status"
      className="border border-[color:var(--color-seal-red)]/50 bg-[color:var(--color-seal-red)]/10 px-4 py-3"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-seal-red)]">
        Standing finding {divergence.findingId}
      </p>
      <p className="mt-1 font-display text-lg text-[color:var(--color-parchment)]">
        Believed impact concentrates on {THREAT_LABELS[divergence.threatClass].toLowerCase()} (
        {Math.round(divergence.believedImpactShare * 100)}%) while control spend sits on the perimeter (
        {Math.round(divergence.actualInvestmentShare * 100)}% insider).
      </p>
      <p className="mt-2 font-mono text-xs text-[color:var(--color-muted)]">
        Divergence {Math.round(divergence.divergencePoints * 100)} pts ·{" "}
        <Link to="/allocation" className="text-[color:var(--color-brand)] underline-offset-2 hover:underline">
          Open reconciliation
        </Link>
      </p>
    </aside>
  );
}
