import { Link } from "react-router-dom";
import { AllocationDivergenceBanner } from "@/components/AllocationDivergenceBanner";
import { THREAT_LABELS, allocation } from "@/lib/demo-data";

export function AllocationPage() {
  if (!allocation.financeFeedPresent) {
    return <p className="text-sm text-[color:var(--color-amber-lapse)]">Reconciliation incomplete — finance feed missing.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {allocation.period} · believed impact vs spend
        </p>
        <h1 className="font-display text-3xl">Allocation reconciliation</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          The source contradiction: firms name insiders as greatest impact while funding the perimeter.
        </p>
      </header>

      <AllocationDivergenceBanner />

      <section className="grid gap-8 md:grid-cols-2">
        <BarList
          title="Believed impact"
          rows={allocation.beliefs.map((belief) => ({
            key: belief.threatClass,
            label: THREAT_LABELS[belief.threatClass],
            share: belief.believedShare,
          }))}
        />
        <BarList
          title="Actual control spend"
          rows={allocation.investments.map((row) => ({
            key: row.threatClass,
            label: THREAT_LABELS[row.threatClass],
            share: row.share,
            caption: `€${(row.amount / 1_000_000).toFixed(2)}m`,
          }))}
        />
      </section>

      <p className="text-sm text-[color:var(--color-muted)]">
        Trust in internal controls to detect insider activity:{" "}
        {Math.round((allocation.beliefs[0]?.trustInInternalControls ?? 0) * 100)}%.{" "}
        <Link to="/findings" className="text-[color:var(--color-brand)]">
          Raise / review finding {allocation.divergences[0]?.findingId}
        </Link>
      </p>
    </div>
  );
}

function BarList({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; label: string; share: number; caption?: string }[];
}) {
  return (
    <div>
      <h2 className="font-display text-lg">{title}</h2>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.key}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{row.label}</span>
              <span className="font-mono text-xs">
                {Math.round(row.share * 100)}%{row.caption ? ` · ${row.caption}` : ""}
              </span>
            </div>
            <div className="h-2 bg-[color:var(--color-ink)]">
              <div
                className={`h-2 ${row.key === "insider" ? "bg-[color:var(--color-seal-red)]" : "bg-[color:var(--color-seal)]"}`}
                style={{ width: `${row.share * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
