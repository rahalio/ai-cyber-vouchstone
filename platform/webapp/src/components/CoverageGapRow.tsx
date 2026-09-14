import { Link } from "react-router-dom";
import { assetName, formatDate, type CoverageGap } from "@/lib/demo-data";

export function CoverageGapRow({ gap }: { gap: CoverageGap }) {
  return (
    <article className="grid gap-2 border-b border-[color:var(--color-rule)] py-3 md:grid-cols-[8rem_1fr_auto] md:items-start">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-amber-lapse)]">
        {gap.surface.replaceAll("_", " ")}
      </p>
      <div>
        <p className="text-sm text-[color:var(--color-parchment)]">{gap.description}</p>
        <p className="mt-1 font-mono text-[11px] text-[color:var(--color-muted)]">
          {gap.id} · {assetName(gap.assetId)} · opened {formatDate(gap.openedAt)}
        </p>
      </div>
      {gap.findingId ? (
        <Link to="/findings" className="font-mono text-[11px] text-[color:var(--color-brand)] underline-offset-2 hover:underline">
          {gap.findingId}
        </Link>
      ) : (
        <span className="font-mono text-[11px] text-[color:var(--color-muted)]">Unlinked</span>
      )}
    </article>
  );
}
