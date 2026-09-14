import { AUDIENCE_LABELS, DOMAIN_LABELS, formatDateTime, type ExportPackage } from "@/lib/demo-data";

export function ClaimTraceExport({ pack }: { pack: ExportPackage }) {
  return (
    <article className="border border-[color:var(--color-rule)] bg-[color:var(--color-panel)] p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-brand)]">
            {AUDIENCE_LABELS[pack.audience]}
          </p>
          <h3 className="font-display text-lg">{pack.recipient}</h3>
        </div>
        <p className="font-mono text-[11px] text-[color:var(--color-muted)]">{pack.id}</p>
      </div>
      <p className="mt-2 font-mono text-[11px] text-[color:var(--color-muted)]">
        Frozen {formatDateTime(pack.generatedAt)} · {pack.manifestHash} · {pack.generatedBy}
      </p>
      <ul className="mt-4 space-y-2">
        {pack.claimTraceability.map((trace) => (
          <li key={trace.claimDomain} className="flex flex-wrap justify-between gap-2 text-sm">
            <span>{DOMAIN_LABELS[trace.claimDomain]}</span>
            <span className="font-mono text-[11px] text-[color:var(--color-seal)]">
              {trace.evidenceItemIds.join(" · ") || "— no voucher"}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
