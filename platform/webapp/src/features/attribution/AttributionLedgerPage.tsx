import { DiscovererAttributionChip } from "@/components/DiscovererAttributionChip";
import { TtdDistribution } from "@/components/TtdDistribution";
import { DISCOVERER_LABELS, assetName, discoveryShare, formatDate, incidents } from "@/lib/demo-data";

export function AttributionLedgerPage() {
  const unattributed = incidents.filter((row) => row.discovererClass === "unknown");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Standing metrics · BR-5 / BR-6
        </p>
        <h1 className="font-display text-3xl">Attribution ledger</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Who discovered each successful attack, locked at intake. Time-to-detect is measured, never surveyed.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric
          label="Security-function discovery share"
          value={`${Math.round(discoveryShare.securityFunctionDiscoveryShare * 100)}%`}
          hint={`${discoveryShare.confirmedSuccessfulAttacks} confirmed successful attacks`}
        />
        <Metric
          label="Successful attacks / month"
          value={discoveryShare.successfulAttacksPerMonth.toFixed(1)}
          hint={`${discoveryShare.targetedAttacksAchievingObjective} of ${discoveryShare.targetedAttacksObserved} targeted reached objective`}
        />
        <Metric label="Period" value="Trailing 12m" hint={discoveryShare.period} />
      </div>

      <ul className="flex flex-wrap gap-2">
        {discoveryShare.byDiscovererClass.map((row) => (
          <li key={row.discovererClass} className="font-mono text-[11px] text-[color:var(--color-muted)]">
            <DiscovererAttributionChip discovererClass={row.discovererClass} /> {row.count} · {Math.round(row.share * 100)}%
          </li>
        ))}
      </ul>

      <TtdDistribution />

      {unattributed.length > 0 && (
        <p role="status" className="text-sm text-[color:var(--color-seal-red)]">
          Unattributed confirmed incidents block the ledger: {unattributed.map((row) => row.id).join(", ")}.
        </p>
      )}

      <table className="w-full text-left text-sm">
        <thead className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          <tr>
            <th className="py-2 font-normal">Incident</th>
            <th className="py-2 font-normal">Discoverer</th>
            <th className="py-2 font-normal">TTD</th>
            <th className="py-2 font-normal">Assets</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((row) => (
            <tr key={row.id} className="border-t border-[color:var(--color-rule)]">
              <td className="py-3">
                <div className="font-mono text-xs">{row.id}</div>
                <div className="text-[color:var(--color-muted)]">{formatDate(row.confirmedAt)} · {row.threatClass.replaceAll("_", " ")}</div>
              </td>
              <td className="py-3">
                <DiscovererAttributionChip discovererClass={row.discovererClass} />
                <div className="mt-1 font-mono text-[10px] text-[color:var(--color-muted)]">{DISCOVERER_LABELS[row.discovererClass]} at intake</div>
              </td>
              <td className="py-3 font-mono text-xs">
                {row.days}d · {row.band.replaceAll("_", " ")}
              </td>
              <td className="py-3 text-[color:var(--color-muted)]">
                {row.affectedAssetIds.map(assetName).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="border border-[color:var(--color-rule)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 font-mono text-[11px] text-[color:var(--color-muted)]">{hint}</p>
    </div>
  );
}
