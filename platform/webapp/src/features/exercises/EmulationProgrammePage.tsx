import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import {
  SCENARIO_LABELS,
  accessLogNotice,
  assetName,
  exercises,
  formatDate,
} from "@/lib/demo-data";

export function EmulationProgrammePage() {
  const overdue = exercises.filter((item) => item.status === "missed" || item.status === "expired");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Independent sparring · BR-8
        </p>
        <h1 className="font-display text-3xl">Emulation programme</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Scheduled obligation over named assets. A missed due date expires the evidence.
        </p>
      </header>

      <p role="status" className="border border-[color:var(--color-rule)] px-3 py-2 font-mono text-[11px] text-[color:var(--color-amber-lapse)]">
        {accessLogNotice}
      </p>

      {overdue.length > 0 && (
        <p className="text-sm text-[color:var(--color-seal-red)]">
          Overdue or expired exercises: {overdue.map((item) => item.id).join(", ")}. Related domain evidence is expired.
        </p>
      )}

      <ol className="space-y-3">
        {exercises.map((exercise) => (
          <li
            key={exercise.id}
            className={cn(
              "border border-[color:var(--color-rule)] p-4",
              (exercise.status === "missed" || exercise.status === "expired") &&
                "border-[color:var(--color-seal-red)]/50",
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-xs">{exercise.id}</p>
              <p
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest",
                  exercise.status === "scheduled" && "text-[color:var(--color-brand)]",
                  exercise.status === "executed" && "text-[color:var(--color-trust)]",
                  (exercise.status === "missed" || exercise.status === "expired") && "text-[color:var(--color-seal-red)]",
                )}
              >
                {exercise.status}
              </p>
            </div>
            <h2 className="mt-1 font-display text-xl">{SCENARIO_LABELS[exercise.scenario]}</h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              {exercise.providerName}
              {exercise.providerIndependent ? " · independent" : ""} · due {formatDate(exercise.dueDate)}
              {exercise.executedAt ? ` · run ${formatDate(exercise.executedAt)}` : ""}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[color:var(--color-muted)]">
              Scope {exercise.scopeAssetIds.map(assetName).join(" · ")}
              {exercise.outcome ? ` · ${exercise.outcome.replaceAll("_", " ")}` : ""}
              {exercise.detectedByDefenders === false ? " · not detected by defenders" : ""}
            </p>
            {exercise.findingIds.length > 0 && (
              <p className="mt-2 text-sm">
                Findings{" "}
                <Link to="/findings" className="font-mono text-[color:var(--color-brand)]">
                  {exercise.findingIds.join(", ")}
                </Link>
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
