import { cn } from "@/lib/cn";
import { formatDate, type PriorityAsset } from "@/lib/demo-data";

const stateCopy: Record<PriorityAsset["attestationState"], string> = {
  current: "Attested",
  due: "Re-attest due",
  stale: "Stale — coverage claims blocked",
  never_attested: "Never attested",
};

export function AssetAttestationCard({
  asset,
  onAttest,
}: {
  asset: PriorityAsset;
  onAttest?: (id: string) => void;
}) {
  const blocking = asset.attestationState === "stale" || asset.attestationState === "never_attested";

  return (
    <article className="border border-[color:var(--color-rule)] bg-[color:var(--color-panel)] p-4">
      {blocking && (
        <p
          role="status"
          className="mb-3 border border-[color:var(--color-seal-red)]/40 bg-[color:var(--color-seal-red)]/10 px-2 py-1 font-mono text-[11px] text-[color:var(--color-parchment)]"
        >
          {stateCopy[asset.attestationState]}
        </p>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
            {asset.businessCriticality.replaceAll("_", " ")} · {asset.id}
          </p>
          <h3 className="font-display text-xl text-[color:var(--color-parchment)]">{asset.name}</h3>
        </div>
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest",
            blocking
              ? "text-[color:var(--color-seal-red)]"
              : asset.attestationState === "due"
                ? "text-[color:var(--color-amber-lapse)]"
                : "text-[color:var(--color-trust)]",
          )}
        >
          {stateCopy[asset.attestationState]}
        </span>
      </div>
      <dl className="mt-4 grid gap-2 text-sm">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">Where</dt>
          <dd>{asset.location}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">Owner</dt>
          <dd>
            {asset.ownerName} · {asset.businessUnit}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">Adversary after</dt>
          <dd>{asset.adversaryObjective}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">Last attested</dt>
          <dd className="font-mono text-xs">
            {asset.lastAttestedAt ? formatDate(asset.lastAttestedAt) : "—"} · cycle {asset.reattestationIntervalDays}d
          </dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => onAttest?.(asset.id)}
        className="mt-4 border border-[color:var(--color-brand)] px-3 py-1.5 text-sm text-[color:var(--color-brand)] transition-colors duration-[var(--motion-seal)] hover:bg-[color:var(--color-brand)]/10"
      >
        {asset.attestationState === "current" ? "Re-attest location" : "Attest what / where"}
      </button>
    </article>
  );
}
