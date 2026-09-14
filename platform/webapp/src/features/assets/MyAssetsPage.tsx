import { useState } from "react";
import { AssetAttestationCard } from "@/components/AssetAttestationCard";
import { accessLogNotice, currentOwner, myAssets, type PriorityAsset } from "@/lib/demo-data";

export function MyAssetsPage() {
  const [rows, setRows] = useState<PriorityAsset[]>(myAssets);

  function attest(id: string) {
    setRows((current) =>
      current.map((asset) =>
        asset.id === id
          ? { ...asset, attestationState: "current", lastAttestedAt: new Date().toISOString() }
          : asset,
      ),
    );
  }

  const stale = rows.filter((asset) => asset.attestationState === "stale" || asset.attestationState === "never_attested");

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Compartment · {currentOwner.unit}
        </p>
        <h1 className="font-display text-3xl">My assets</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          Owner-attested priority assets with location. No estate-wide browse.
        </p>
      </header>

      <p role="status" className="border border-[color:var(--color-rule)] px-3 py-2 font-mono text-[11px] text-[color:var(--color-amber-lapse)]">
        {accessLogNotice} Signed in as {currentOwner.name}.
      </p>

      {stale.length > 0 && (
        <p className="text-sm text-[color:var(--color-seal-red)]">
          Stale attestation blocks coverage claims on {stale.map((asset) => asset.name).join(", ")}.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((asset) => (
          <AssetAttestationCard key={asset.id} asset={asset} onAttest={attest} />
        ))}
      </div>
    </div>
  );
}
