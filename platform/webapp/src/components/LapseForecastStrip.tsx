import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import {
  DOMAIN_LABELS,
  EVIDENCE_TYPE_LABELS,
  formatDate,
  lapseForecast,
  type LapseForecastItem,
} from "@/lib/demo-data";

export function LapseForecastStrip({
  items = lapseForecast.lapses,
}: {
  items?: LapseForecastItem[];
}) {
  const quarters = ["2026-Q4", "2027-Q1"] as const;

  return (
    <section aria-live="polite" className="border border-[color:var(--color-rule)] bg-[color:var(--color-panel)] p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-amber-lapse)]">
            Next two quarters
          </p>
          <h2 className="font-display text-lg text-[color:var(--color-parchment)]">Lapse forecast</h2>
        </div>
        <p className="font-mono text-xs text-[color:var(--color-muted)]">
          Projected overall movement {lapseForecast.projectedOverallScoreChange.toFixed(1)} ·{" "}
          <Link to="/evidence/lapse-forecast" className="text-[color:var(--color-brand)] underline-offset-2 hover:underline">
            Full forecast
          </Link>
        </p>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {quarters.map((quarter) => (
          <div key={quarter}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">{quarter}</p>
            <ul className="mt-2 space-y-2">
              {items
                .filter((item) => item.quarter === quarter)
                .map((item) => (
                  <li key={item.evidenceItemId} className="flex items-start justify-between gap-3 text-sm">
                    <span>
                      <span className={cn("mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] bg-[color:var(--color-amber-lapse)]")} />
                      {EVIDENCE_TYPE_LABELS[item.typeKey] ?? item.typeKey}
                      <span className="mt-0.5 block font-mono text-[11px] text-[color:var(--color-muted)]">
                        {item.evidenceItemId} · {item.affectedDomains.map((d) => DOMAIN_LABELS[d]).join(", ")}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-[color:var(--color-amber-lapse)]">
                      {formatDate(item.expiresAt)} → cap {item.projectedCapAfterLapse}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
