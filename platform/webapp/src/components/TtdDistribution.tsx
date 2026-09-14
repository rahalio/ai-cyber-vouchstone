import { cn } from "@/lib/cn";
import { TTD_BAND_LABELS, ttdDistribution } from "@/lib/demo-data";

export function TtdDistribution({
  distribution = ttdDistribution,
}: {
  distribution?: typeof ttdDistribution;
}) {
  const max = Math.max(...distribution.byBand.map((band) => band.share));

  return (
    <section className="border border-[color:var(--color-rule)] bg-[color:var(--color-panel)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        Measured interval · estimates excluded
      </p>
      <h2 className="font-display text-lg">Time-to-detect distribution</h2>
      <p className="mt-1 font-mono text-xs text-[color:var(--color-muted)]">
        n={distribution.sampleSize} · median {distribution.medianDays}d · p90 {distribution.ninetiethPercentileDays}d
      </p>
      <ul className="mt-5 space-y-3">
        {distribution.byBand.map((band) => {
          const tail = band.band === "months" || band.band === "year_or_more";
          return (
            <li key={band.band}>
              <div className="mb-1 flex justify-between font-mono text-[11px]">
                <span className={tail ? "text-[color:var(--color-amber-lapse)]" : "text-[color:var(--color-muted)]"}>
                  {TTD_BAND_LABELS[band.band]}
                </span>
                <span>
                  {band.count} · {Math.round(band.share * 100)}%
                </span>
              </div>
              <div className="h-2 bg-[color:var(--color-ink)]">
                <div
                  className={cn(
                    "h-2",
                    tail ? "bg-[color:var(--color-amber-lapse)]" : "bg-[color:var(--color-seal)]",
                  )}
                  style={{ width: `${(band.share / max) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
