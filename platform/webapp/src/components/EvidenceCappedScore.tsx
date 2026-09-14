import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import {
  DOMAIN_LABELS,
  type DomainScore,
  scoreState,
} from "@/lib/demo-data";

export function EvidenceCappedScore({
  score,
  compact = false,
}: {
  score: DomainScore;
  compact?: boolean;
}) {
  const state = scoreState(score);
  const stateColor =
    state === "Suppressed"
      ? "text-[color:var(--color-seal-red)]"
      : state === "Lapsing"
        ? "text-[color:var(--color-amber-lapse)]"
        : state === "Floored"
          ? "text-[color:var(--color-muted)]"
          : "text-[color:var(--color-seal)]";

  return (
    <Link
      to={`/domains/${score.domain}`}
      className={cn(
        "block border border-[color:var(--color-rule)] bg-[color:var(--color-panel)] p-4 transition-colors duration-[var(--motion-seal)] hover:border-[color:var(--color-brand)]/50",
        state === "Suppressed" && "animate-suppress",
        compact ? "min-h-0" : "min-h-[11rem]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
          {DOMAIN_LABELS[score.domain]}
        </p>
        <span className={cn("font-mono text-[10px] uppercase tracking-widest", stateColor)}>
          {state}
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span
          className={cn(
            "font-display text-5xl leading-none text-[color:var(--color-parchment)]",
            state === "Lapsing" && "animate-lapse",
          )}
        >
          {score.score}
        </span>
        <span className="mb-1 font-mono text-xs text-[color:var(--color-muted)]">
          / cap {score.cap.cap}
        </span>
      </div>
      <div className="mt-3 flex gap-1" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => {
          const tick = index + 1;
          const filled = tick <= score.score;
          const inCap = tick <= score.cap.cap;
          return (
            <span
              key={tick}
              className={cn(
                "h-1.5 flex-1",
                filled
                  ? state === "Suppressed"
                    ? "bg-[color:var(--color-seal-red)]"
                    : state === "Lapsing"
                      ? "bg-[color:var(--color-amber-lapse)]"
                      : "bg-[color:var(--color-seal)]"
                  : inCap
                    ? "bg-[color:var(--color-rule)]"
                    : "bg-[color:var(--color-ink)]",
              )}
            />
          );
        })}
      </div>
      {!compact && (
        <p className="mt-3 font-mono text-[11px] text-[color:var(--color-muted)]">
          Evidence-backed {Math.round(score.evidenceBackedShare * 100)}% · asserted {score.claimedScore}
          {score.cap.contributingFindingIds.length > 0
            ? ` · suppressed by ${score.cap.contributingFindingIds.join(", ")}`
            : ""}
        </p>
      )}
    </Link>
  );
}
