import { cn } from "@/lib/cn";
import {
  DOMAIN_LABELS,
  EVIDENCE_TYPE_LABELS,
  formatDate,
  type EvidenceItem,
} from "@/lib/demo-data";

const validityLabel: Record<EvidenceItem["validity"], string> = {
  valid: "Valid",
  expiring: "Lapsing",
  expired: "Lapsed",
  superseded: "Superseded",
};

export function ValidityClockRow({ item }: { item: EvidenceItem }) {
  const tone =
    item.validity === "expired"
      ? "text-[color:var(--color-seal-red)]"
      : item.validity === "expiring"
        ? "text-[color:var(--color-amber-lapse)]"
        : item.validity === "superseded"
          ? "text-[color:var(--color-seal-dim)]"
          : "text-[color:var(--color-trust)]";

  return (
    <article className="grid gap-2 border-b border-[color:var(--color-rule)] py-3 md:grid-cols-[7rem_1fr_auto] md:items-baseline">
      <p className={cn("font-mono text-xs uppercase tracking-widest", tone)}>
        {validityLabel[item.validity]}
      </p>
      <div>
        <p className="font-display text-sm text-[color:var(--color-parchment)]">
          {EVIDENCE_TYPE_LABELS[item.typeKey] ?? item.typeKey}
        </p>
        <p className="mt-1 font-mono text-[11px] text-[color:var(--color-muted)]">
          {item.id} · {item.provenance.replaceAll("_", " ")} · {item.providerName}
          {item.supersededById ? ` · superseded by ${item.supersededById}` : ""}
        </p>
        <p className="mt-1 text-xs text-[color:var(--color-muted)]">
          {item.domains.map((domain) => DOMAIN_LABELS[domain]).join(" · ")}
        </p>
      </div>
      <p
        className={cn(
          "font-mono text-xs",
          item.validity === "expiring" && "animate-lapse text-[color:var(--color-amber-lapse)]",
        )}
      >
        Expires {formatDate(item.expiresAt)}
      </p>
    </article>
  );
}
