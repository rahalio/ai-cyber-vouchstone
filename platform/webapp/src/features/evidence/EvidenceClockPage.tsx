import { useMemo, useState } from "react";
import { ValidityClockRow } from "@/components/ValidityClockRow";
import { EVIDENCE_TYPE_LABELS, evidenceItems, type EvidenceItem } from "@/lib/demo-data";

const filters = ["all", ...Object.keys(EVIDENCE_TYPE_LABELS)] as const;

export function EvidenceClockPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [accepted, setAccepted] = useState<string[]>([]);

  const items = useMemo(() => {
    const list = [...evidenceItems].sort(
      (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
    );
    return filter === "all" ? list : list.filter((item) => item.typeKey === filter);
  }, [filter]);

  const pending = items.filter((item) => item.validity === "expiring" || item.validity === "expired");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Evidence plane</p>
        <h1 className="font-display text-3xl">Evidence clock</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Typed vouchers with validity periods. Automatic lapse drives score movement.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
              filter === key
                ? "border-[color:var(--color-brand)] text-[color:var(--color-brand)]"
                : "border-[color:var(--color-rule)] text-[color:var(--color-muted)]"
            }`}
          >
            {key === "all" ? "All types" : EVIDENCE_TYPE_LABELS[key]}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-[color:var(--color-muted)]">Pending intake — queue for the assurance lead.</p>
      ) : (
        <div>
          {items.map((item) => (
            <EvidenceRow
              key={item.id}
              item={item}
              accepted={accepted.includes(item.id)}
              onAccept={() => setAccepted((ids) => [...ids, item.id])}
            />
          ))}
        </div>
      )}

      <p className="font-mono text-[11px] text-[color:var(--color-muted)]" aria-live="polite">
        {pending.length} items expiring or already lapsed this cycle.
      </p>
    </div>
  );
}

function EvidenceRow({
  item,
  accepted,
  onAccept,
}: {
  item: EvidenceItem;
  accepted: boolean;
  onAccept: () => void;
}) {
  return (
    <div>
      <ValidityClockRow item={item} />
      <div className="-mt-1 mb-3 flex gap-2">
        <button
          type="button"
          onClick={onAccept}
          className="font-mono text-[11px] text-[color:var(--color-brand)]"
        >
          {accepted ? "Accepted into ledger" : "Accept evidence"}
        </button>
        <span className="font-mono text-[11px] text-[color:var(--color-muted)]">Mark superseded</span>
        <span className="font-mono text-[11px] text-[color:var(--color-muted)]">Export validity at statement date</span>
      </div>
    </div>
  );
}
