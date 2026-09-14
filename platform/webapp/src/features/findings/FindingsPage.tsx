import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { DOMAIN_LABELS, findings, lastClosedFinding } from "@/lib/demo-data";

export function FindingsPage() {
  const queue = findings.filter((item) => item.state !== "closed");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Remediation · score suppression
        </p>
        <h1 className="font-display text-3xl">Findings</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Named owner, due date. Unremediated findings suppress domain scores in-product.
        </p>
      </header>

      {queue.length === 0 ? (
        <p className="text-sm text-[color:var(--color-trust)]">
          Queue clear. Last closure {lastClosedFinding?.closedAt?.slice(0, 10) ?? "—"}.
        </p>
      ) : (
        <ul className="divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
          {queue.map((finding) => (
            <li key={finding.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-mono text-xs text-[color:var(--color-muted)]">{finding.id}</p>
                <p
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest",
                    finding.state === "overdue" ? "text-[color:var(--color-seal-red)]" : "text-[color:var(--color-amber-lapse)]",
                  )}
                >
                  {finding.state}
                  {finding.suppressingDomainScore ? " · suppressing score" : ""}
                </p>
              </div>
              <h2 className="mt-1 font-display text-lg">{finding.title}</h2>
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                {finding.ownerName} · due {finding.dueDate} · {finding.origin.replaceAll("_", " ")} ·{" "}
                {finding.domains.map((d) => DOMAIN_LABELS[d]).join(", ")}
              </p>
              <p className="mt-2 text-sm">{finding.plan}</p>
              {finding.domains[0] && (
                <Link
                  to={`/domains/${finding.domains[0]}`}
                  className="mt-2 inline-block font-mono text-[11px] text-[color:var(--color-brand)]"
                >
                  View suppressed domain
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
