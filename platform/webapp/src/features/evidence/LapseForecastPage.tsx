import { Link } from "react-router-dom";
import { LapseForecastStrip } from "@/components/LapseForecastStrip";
import { DOMAIN_LABELS, EVIDENCE_TYPE_LABELS, formatDate, lapseForecast } from "@/lib/demo-data";

export function LapseForecastPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-amber-lapse)]">
          Two-quarter horizon
        </p>
        <h1 className="font-display text-3xl">Lapse forecast</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Commission exercise or attestation before the board pack turns amber without a new incident.
        </p>
      </header>

      <LapseForecastStrip />

      <table className="w-full text-left text-sm">
        <thead className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          <tr>
            <th className="py-2 font-normal">Voucher</th>
            <th className="py-2 font-normal">Domains</th>
            <th className="py-2 font-normal">Expires</th>
            <th className="py-2 font-normal">Cap after</th>
          </tr>
        </thead>
        <tbody>
          {lapseForecast.lapses.map((item) => (
            <tr key={item.evidenceItemId} className="border-t border-[color:var(--color-rule)]">
              <td className="py-3">
                <div>{EVIDENCE_TYPE_LABELS[item.typeKey]}</div>
                <div className="font-mono text-[11px] text-[color:var(--color-muted)]">{item.evidenceItemId}</div>
              </td>
              <td className="py-3 text-[color:var(--color-muted)]">
                {item.affectedDomains.map((d) => DOMAIN_LABELS[d]).join(", ")}
              </td>
              <td className="py-3 font-mono text-xs text-[color:var(--color-amber-lapse)]">{formatDate(item.expiresAt)}</td>
              <td className="py-3 font-display text-lg">{item.projectedCapAfterLapse}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/exercises" className="inline-block border border-[color:var(--color-brand)] px-4 py-2 text-sm text-[color:var(--color-brand)]">
        Commission sparring
      </Link>
    </div>
  );
}
