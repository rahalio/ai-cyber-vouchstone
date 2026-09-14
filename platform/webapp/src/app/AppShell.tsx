import { useEffect, useState } from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { DomainPosturePage } from "../features/domains/DomainPosturePage";
import { DomainDetailPage } from "../features/domains/DomainDetailPage";
import { EvidenceClockPage } from "../features/evidence/EvidenceClockPage";
import { LapseForecastPage } from "../features/evidence/LapseForecastPage";
import { MyAssetsPage } from "../features/assets/MyAssetsPage";
import { CoverageMapPage } from "../features/coverage/CoverageMapPage";
import { AttributionLedgerPage } from "../features/attribution/AttributionLedgerPage";
import { EmulationProgrammePage } from "../features/exercises/EmulationProgrammePage";
import { FindingsPage } from "../features/findings/FindingsPage";
import { AllocationPage } from "../features/allocation/AllocationPage";
import { AssuranceExportsPage } from "../features/assurance/AssuranceExportsPage";
import { AuditTestPage } from "../features/assurance/AuditTestPage";
import { GovernancePage } from "../features/governance/GovernancePage";
import { org } from "@/lib/demo-data";
import { isSignedIn, signOut } from "@/lib/session";

const nav = [
  { to: "/", label: "Domain posture", end: true },
  { to: "/evidence", label: "Evidence clock", end: true },
  { to: "/evidence/lapse-forecast", label: "Lapse forecast", end: true },
  { to: "/assets", label: "My assets", end: true },
  { to: "/coverage", label: "Coverage gaps", end: true },
  { to: "/attribution", label: "Attribution", end: true },
  { to: "/exercises", label: "Emulation", end: true },
  { to: "/findings", label: "Findings", end: true },
  { to: "/allocation", label: "Allocation", end: true },
  { to: "/assurance", label: "Assurance exports", end: true },
  { to: "/assurance/audit", label: "Audit test", end: true },
  { to: "/governance", label: "Governance", end: true },
];

export function AppShell() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(isSignedIn());
  }, []);

  if (allowed === null) return null;
  if (!allowed) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-full">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[color:var(--color-brand)]/20 bg-[color:var(--color-surface)] p-4">
        <BrandMark className="mb-1 text-lg tracking-[0.16em]" />
        <p className="mb-8 font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          {org.name}
        </p>
        <nav className="flex flex-1 flex-col gap-1 text-sm">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-2 py-1.5 ${isActive ? "bg-[color:var(--color-brand)]/15 text-[color:var(--color-brand)]" : "text-[color:var(--color-muted)] hover:text-[color:var(--color-parchment)]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-6 font-mono text-[10px] text-[color:var(--color-muted)]">
          {org.statementPeriod} · Draft
        </p>
        <button
          type="button"
          className="mt-2 text-left font-mono text-[11px] text-[color:var(--color-brand)]"
          onClick={() => {
            signOut();
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route index element={<DomainPosturePage />} />
          <Route path="domains/:domainKey" element={<DomainDetailPage />} />
          <Route path="evidence" element={<EvidenceClockPage />} />
          <Route path="evidence/lapse-forecast" element={<LapseForecastPage />} />
          <Route path="assets" element={<MyAssetsPage />} />
          <Route path="coverage" element={<CoverageMapPage />} />
          <Route path="attribution" element={<AttributionLedgerPage />} />
          <Route path="exercises" element={<EmulationProgrammePage />} />
          <Route path="findings" element={<FindingsPage />} />
          <Route path="allocation" element={<AllocationPage />} />
          <Route path="assurance" element={<AssuranceExportsPage />} />
          <Route path="assurance/audit" element={<AuditTestPage />} />
          <Route path="governance" element={<GovernancePage />} />
        </Routes>
      </main>
    </div>
  );
}
