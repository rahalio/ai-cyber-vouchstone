import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { ClaimTraceExport } from "@/components/ClaimTraceExport";
import {
  DOMAIN_LABELS,
  draftClaims,
  exportPackages,
  org,
  publishedStatement,
} from "@/lib/demo-data";

export function AssuranceExportsPage() {
  const blocked = draftClaims.some((claim) => claim.score > claim.capAtPublication);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <BrandMark className="text-sm tracking-[0.28em]" />
        <h1 className="mt-2 font-display text-3xl">Assurance exports</h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          One evidence base → committee pack, regulatory return, insurance proposal. Claims cannot diverge.
        </p>
      </header>

      <section className="border border-[color:var(--color-rule)] p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-brand)]">
          {org.statementPeriod} · {org.statementStatus} · unsigned
        </p>
        <h2 className="mt-1 font-display text-xl">Draft claims</h2>
        <ul className="mt-4 space-y-2">
          {draftClaims.map((claim) => (
            <li key={claim.domain} className="flex flex-wrap justify-between gap-2 text-sm">
              <span>
                {DOMAIN_LABELS[claim.domain]} · {claim.score} / cap {claim.capAtPublication}
              </span>
              <span className="font-mono text-[11px] text-[color:var(--color-seal)]">
                {claim.supportingEvidenceIds.join(" · ")}
              </span>
            </li>
          ))}
        </ul>
        <p
          role="status"
          className={`mt-4 font-mono text-xs ${blocked ? "text-[color:var(--color-seal-red)]" : "text-[color:var(--color-trust)]"}`}
        >
          {blocked
            ? "Cap violation blocks publish (BR-1)."
            : `Ready for ${org.ciso} sign-off. Validity will freeze at publish.`}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={blocked}
            className="bg-[color:var(--color-brand)] px-4 py-2 text-sm text-[color:var(--color-ink)] disabled:opacity-40"
          >
            Sign as CISO
          </button>
          <Link to="/assurance/audit" className="border border-[color:var(--color-rule)] px-4 py-2 text-sm">
            Audit test view
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg">Published packs · {publishedStatement.id}</h2>
        <p className="mt-1 font-mono text-[11px] text-[color:var(--color-muted)]">
          Frozen {publishedStatement.frozenEvidenceStateHash} · signed {publishedStatement.signedAt.slice(0, 10)}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {exportPackages.map((pack) => (
            <ClaimTraceExport key={pack.id} pack={pack} />
          ))}
        </div>
      </section>
    </div>
  );
}
