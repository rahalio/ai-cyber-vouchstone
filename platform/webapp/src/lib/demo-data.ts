export type DomainKey =
  | "risk_exposure"
  | "governance_and_leadership"
  | "strategic_context"
  | "resilience"
  | "response_capability"
  | "extended_ecosystem"
  | "efficient_investment";

export type ScoreCapReason =
  | "insufficient_evidence"
  | "evidence_expired"
  | "open_findings"
  | "attestation_stale"
  | "never_exercised";

export type ScoreState = "Capped" | "Lapsing" | "Suppressed" | "Floored";

export type EvidenceValidity = "valid" | "expiring" | "expired" | "superseded";

export type DiscovererClass =
  | "security_function"
  | "other_employee"
  | "authority_or_regulator"
  | "external_researcher"
  | "supplier"
  | "customer"
  | "unknown";

export type TtdBand = "hours" | "days" | "weeks" | "months" | "year_or_more";

export const DOMAIN_LABELS: Record<DomainKey, string> = {
  risk_exposure: "Risk exposure",
  governance_and_leadership: "Governance & leadership",
  strategic_context: "Strategic context",
  resilience: "Resilience",
  response_capability: "Response capability",
  extended_ecosystem: "Extended ecosystem",
  efficient_investment: "Efficient investment",
};

export const DOMAIN_KEYS = Object.keys(DOMAIN_LABELS) as DomainKey[];

export const EVIDENCE_TYPE_LABELS: Record<string, string> = {
  asset_attestation: "Asset attestation",
  emulation_exercise_report: "Emulation exercise",
  response_plan_test: "Response plan test",
  recovery_plan_test: "Recovery plan test",
  detection_coverage_scan: "Detection coverage scan",
  escalation_path_test: "Escalation path test",
  third_party_assessment: "Third-party assessment",
  contractual_clause_review: "Contractual clause review",
  control_spend_statement: "Control spend statement",
  training_completion: "Training completion",
  incident_postmortem: "Incident post-mortem",
};

export const DISCOVERER_LABELS: Record<DiscovererClass, string> = {
  security_function: "Security function",
  other_employee: "Employee",
  authority_or_regulator: "Authority",
  external_researcher: "Researcher",
  supplier: "Supplier",
  customer: "Customer",
  unknown: "Unattributed",
};

export const TTD_BAND_LABELS: Record<TtdBand, string> = {
  hours: "Hours",
  days: "Days",
  weeks: "Weeks",
  months: "Months",
  year_or_more: "Year or more",
};

export function isDomainKey(value: string | undefined): value is DomainKey {
  return Boolean(value && value in DOMAIN_LABELS);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export const org = {
  name: "HidroAtlántico",
  statementPeriod: "2026-Q3",
  statementStatus: "draft" as const,
  ciso: "Elena Vázquez",
  assuranceLead: "Martín Soler",
  committeeChair: "Sofía Alarcón",
  computedAt: "2026-09-14T07:40:00Z",
};

export type DomainScore = {
  domain: DomainKey;
  score: number;
  claimedScore: number;
  cap: { domain: DomainKey; cap: number; reason: ScoreCapReason; contributingFindingIds: string[] };
  evidenceBackedShare: number;
  validEvidenceIds: string[];
  lapsedEvidenceIds: string[];
  narrative: string;
  computedAt: string;
  lapsing: boolean;
};

export const domainScores: DomainScore[] = [
  {
    domain: "risk_exposure",
    score: 3,
    claimedScore: 4,
    cap: {
      domain: "risk_exposure",
      cap: 3,
      reason: "insufficient_evidence",
      contributingFindingIds: [],
    },
    evidenceBackedShare: 0.74,
    validEvidenceIds: ["EVD-2026-004", "EVD-2026-011"],
    lapsedEvidenceIds: ["EVD-2025-088"],
    narrative: "Priority-asset register is current for grid operations; retail billing location still due.",
    computedAt: org.computedAt,
    lapsing: true,
  },
  {
    domain: "governance_and_leadership",
    score: 4,
    claimedScore: 4,
    cap: {
      domain: "governance_and_leadership",
      cap: 4,
      reason: "insufficient_evidence",
      contributingFindingIds: [],
    },
    evidenceBackedShare: 0.81,
    validEvidenceIds: ["EVD-2026-002", "EVD-2026-015"],
    lapsedEvidenceIds: [],
    narrative: "Chain of command and committee minute trail evidenced; incentive scheme not re-tested this cycle.",
    computedAt: org.computedAt,
    lapsing: false,
  },
  {
    domain: "strategic_context",
    score: 2,
    claimedScore: 3,
    cap: {
      domain: "strategic_context",
      cap: 2,
      reason: "never_exercised",
      contributingFindingIds: [],
    },
    evidenceBackedShare: 0.41,
    validEvidenceIds: ["EVD-2026-019"],
    lapsedEvidenceIds: ["EVD-2025-041"],
    narrative: "Threat exploration against named adversary objectives is thin; uncapped claim blocked.",
    computedAt: org.computedAt,
    lapsing: false,
  },
  {
    domain: "resilience",
    score: 2,
    claimedScore: 4,
    cap: {
      domain: "resilience",
      cap: 2,
      reason: "open_findings",
      contributingFindingIds: ["FND-EX-019", "FND-IN-007"],
    },
    evidenceBackedShare: 0.55,
    validEvidenceIds: ["EVD-2026-007"],
    lapsedEvidenceIds: ["EVD-2025-062"],
    narrative: "Open exercise findings suppress the score below the recovery-test ceiling.",
    computedAt: org.computedAt,
    lapsing: false,
  },
  {
    domain: "response_capability",
    score: 4,
    claimedScore: 5,
    cap: {
      domain: "response_capability",
      cap: 4,
      reason: "insufficient_evidence",
      contributingFindingIds: [],
    },
    evidenceBackedShare: 0.68,
    validEvidenceIds: ["EVD-2026-001", "EVD-2026-009"],
    lapsedEvidenceIds: [],
    narrative: "Escalation paths tested; response-plan voucher expires before the committee pack.",
    computedAt: org.computedAt,
    lapsing: true,
  },
  {
    domain: "extended_ecosystem",
    score: 2,
    claimedScore: 3,
    cap: {
      domain: "extended_ecosystem",
      cap: 2,
      reason: "evidence_expired",
      contributingFindingIds: ["FND-LP-003"],
    },
    evidenceBackedShare: 0.36,
    validEvidenceIds: ["EVD-2026-018"],
    lapsedEvidenceIds: ["EVD-2025-077", "EVD-2026-003"],
    narrative: "Supplier crisis-collaboration clause review is the only live voucher; assessment lapsed.",
    computedAt: org.computedAt,
    lapsing: true,
  },
  {
    domain: "efficient_investment",
    score: 3,
    claimedScore: 4,
    cap: {
      domain: "efficient_investment",
      cap: 3,
      reason: "open_findings",
      contributingFindingIds: ["FND-AL-001"],
    },
    evidenceBackedShare: 0.62,
    validEvidenceIds: ["EVD-2026-012"],
    lapsedEvidenceIds: [],
    narrative: "Standing allocation divergence (insider impact vs perimeter spend) caps this domain.",
    computedAt: org.computedAt,
    lapsing: false,
  },
];

export function scoreState(score: DomainScore): ScoreState {
  if (score.cap.reason === "open_findings") return "Suppressed";
  if (score.validEvidenceIds.length === 0) return "Floored";
  if (score.lapsing) return "Lapsing";
  return "Capped";
}

export function overallEvidenceBackedShare(): number {
  const total = domainScores.reduce((sum, item) => sum + item.evidenceBackedShare, 0);
  return total / domainScores.length;
}

export type EvidenceItem = {
  id: string;
  typeKey: string;
  domains: DomainKey[];
  assetIds: string[];
  effectiveDate: string;
  expiresAt: string;
  validity: EvidenceValidity;
  provenance: "internal" | "independent_provider" | "regulator" | "supplier" | "auditor";
  providerName: string;
  artefactReference: string;
  supersededById?: string;
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: "EVD-2026-001",
    typeKey: "response_plan_test",
    domains: ["response_capability"],
    assetIds: ["AST-SCADA-01", "AST-ID-04"],
    effectiveDate: "2026-04-22",
    expiresAt: "2026-10-22T00:00:00Z",
    validity: "expiring",
    provenance: "internal",
    providerName: "HidroAtlántico IR",
    artefactReference: "IR-TTX-2026-04",
  },
  {
    id: "EVD-2026-002",
    typeKey: "training_completion",
    domains: ["governance_and_leadership"],
    assetIds: [],
    effectiveDate: "2026-03-01",
    expiresAt: "2027-03-01T00:00:00Z",
    validity: "valid",
    provenance: "internal",
    providerName: "People & culture",
    artefactReference: "SEC-CULT-2026",
  },
  {
    id: "EVD-2026-003",
    typeKey: "third_party_assessment",
    domains: ["extended_ecosystem"],
    assetIds: [],
    effectiveDate: "2025-08-12",
    expiresAt: "2026-08-12T00:00:00Z",
    validity: "expired",
    provenance: "supplier",
    providerName: "RedEléctrica OMS",
    artefactReference: "TPRM-OMS-25",
  },
  {
    id: "EVD-2026-004",
    typeKey: "asset_attestation",
    domains: ["risk_exposure"],
    assetIds: ["AST-SCADA-01"],
    effectiveDate: "2026-06-14",
    expiresAt: "2026-12-14T00:00:00Z",
    validity: "valid",
    provenance: "internal",
    providerName: "Clara Méndez",
    artefactReference: "ATT-SCADA-01-06",
  },
  {
    id: "EVD-2026-007",
    typeKey: "recovery_plan_test",
    domains: ["resilience"],
    assetIds: ["AST-SCADA-01", "AST-TEL-03"],
    effectiveDate: "2026-02-18",
    expiresAt: "2027-01-18T00:00:00Z",
    validity: "valid",
    provenance: "auditor",
    providerName: "Deloitte Cyber",
    artefactReference: "REC-DR-2026-02",
  },
  {
    id: "EVD-2026-009",
    typeKey: "escalation_path_test",
    domains: ["response_capability", "governance_and_leadership"],
    assetIds: ["AST-BILL-02"],
    effectiveDate: "2026-05-09",
    expiresAt: "2026-11-09T00:00:00Z",
    validity: "expiring",
    provenance: "internal",
    providerName: "HidroAtlántico IR",
    artefactReference: "ESC-PATH-2026-05",
  },
  {
    id: "EVD-2026-011",
    typeKey: "detection_coverage_scan",
    domains: ["risk_exposure", "resilience"],
    assetIds: ["AST-SCADA-01", "AST-TEL-03"],
    effectiveDate: "2026-07-01",
    expiresAt: "2026-10-01T00:00:00Z",
    validity: "expiring",
    provenance: "internal",
    providerName: "Detection estate",
    artefactReference: "COV-SCAN-2026-07",
  },
  {
    id: "EVD-2026-012",
    typeKey: "control_spend_statement",
    domains: ["efficient_investment"],
    assetIds: [],
    effectiveDate: "2026-07-31",
    expiresAt: "2027-01-31T00:00:00Z",
    validity: "valid",
    provenance: "internal",
    providerName: "Finance BP — security",
    artefactReference: "FIN-SEC-2026-H1",
  },
  {
    id: "EVD-2026-015",
    typeKey: "incident_postmortem",
    domains: ["governance_and_leadership", "response_capability"],
    assetIds: ["AST-BILL-02"],
    effectiveDate: "2026-06-02",
    expiresAt: "2027-06-02T00:00:00Z",
    validity: "valid",
    provenance: "internal",
    providerName: "Incident command",
    artefactReference: "PM-INC-4412",
  },
  {
    id: "EVD-2026-018",
    typeKey: "contractual_clause_review",
    domains: ["extended_ecosystem"],
    assetIds: [],
    effectiveDate: "2026-05-20",
    expiresAt: "2026-11-15T00:00:00Z",
    validity: "expiring",
    provenance: "auditor",
    providerName: "Legal — TPRM",
    artefactReference: "CLAUSE-TPRM-2026",
  },
  {
    id: "EVD-2026-019",
    typeKey: "emulation_exercise_report",
    domains: ["strategic_context", "resilience"],
    assetIds: ["AST-ID-04"],
    effectiveDate: "2026-01-16",
    expiresAt: "2026-07-16T00:00:00Z",
    validity: "expired",
    provenance: "independent_provider",
    providerName: "Northstar Sparring",
    artefactReference: "EMU-INS-2026-01",
    supersededById: undefined,
  },
  {
    id: "EVD-2025-088",
    typeKey: "asset_attestation",
    domains: ["risk_exposure"],
    assetIds: ["AST-BILL-02"],
    effectiveDate: "2025-06-01",
    expiresAt: "2025-12-01T00:00:00Z",
    validity: "superseded",
    provenance: "internal",
    providerName: "Raúl Ortiz",
    artefactReference: "ATT-BILL-02-25",
    supersededById: "EVD-2026-021",
  },
  {
    id: "EVD-2026-021",
    typeKey: "asset_attestation",
    domains: ["risk_exposure"],
    assetIds: ["AST-BILL-02"],
    effectiveDate: "2026-03-12",
    expiresAt: "2026-09-12T00:00:00Z",
    validity: "expired",
    provenance: "internal",
    providerName: "Raúl Ortiz",
    artefactReference: "ATT-BILL-02-03",
  },
];

export type LapseForecastItem = {
  evidenceItemId: string;
  typeKey: string;
  expiresAt: string;
  affectedDomains: DomainKey[];
  projectedCapAfterLapse: number;
  quarter: "2026-Q4" | "2027-Q1";
};

export const lapseForecast = {
  horizonDays: 180,
  generatedAt: org.computedAt,
  projectedOverallScoreChange: -0.6,
  lapses: [
    {
      evidenceItemId: "EVD-2026-011",
      typeKey: "detection_coverage_scan",
      expiresAt: "2026-10-01T00:00:00Z",
      affectedDomains: ["risk_exposure", "resilience"] as DomainKey[],
      projectedCapAfterLapse: 2,
      quarter: "2026-Q4" as const,
    },
    {
      evidenceItemId: "EVD-2026-001",
      typeKey: "response_plan_test",
      expiresAt: "2026-10-22T00:00:00Z",
      affectedDomains: ["response_capability"] as DomainKey[],
      projectedCapAfterLapse: 3,
      quarter: "2026-Q4" as const,
    },
    {
      evidenceItemId: "EVD-2026-009",
      typeKey: "escalation_path_test",
      expiresAt: "2026-11-09T00:00:00Z",
      affectedDomains: ["response_capability", "governance_and_leadership"] as DomainKey[],
      projectedCapAfterLapse: 3,
      quarter: "2026-Q4" as const,
    },
    {
      evidenceItemId: "EVD-2026-018",
      typeKey: "contractual_clause_review",
      expiresAt: "2026-11-15T00:00:00Z",
      affectedDomains: ["extended_ecosystem"] as DomainKey[],
      projectedCapAfterLapse: 1,
      quarter: "2026-Q4" as const,
    },
    {
      evidenceItemId: "EVD-2026-004",
      typeKey: "asset_attestation",
      expiresAt: "2026-12-14T00:00:00Z",
      affectedDomains: ["risk_exposure"] as DomainKey[],
      projectedCapAfterLapse: 2,
      quarter: "2026-Q4" as const,
    },
    {
      evidenceItemId: "EVD-2026-007",
      typeKey: "recovery_plan_test",
      expiresAt: "2027-01-18T00:00:00Z",
      affectedDomains: ["resilience"] as DomainKey[],
      projectedCapAfterLapse: 1,
      quarter: "2027-Q1" as const,
    },
  ] satisfies LapseForecastItem[],
};

export type PriorityAsset = {
  id: string;
  name: string;
  businessCriticality: "low" | "medium" | "high" | "crown_jewel";
  ownerId: string;
  ownerName: string;
  businessUnit: string;
  location: string;
  adversaryObjective: string;
  attestationState: "current" | "due" | "stale" | "never_attested";
  reattestationIntervalDays: number;
  lastAttestedAt: string | null;
};

export const currentOwner = {
  id: "USR-OWNER-CM",
  name: "Clara Méndez",
  unit: "Grid operations",
};

export const assets: PriorityAsset[] = [
  {
    id: "AST-SCADA-01",
    name: "SCADA historian",
    businessCriticality: "crown_jewel",
    ownerId: currentOwner.id,
    ownerName: currentOwner.name,
    businessUnit: "Grid operations",
    location: "Madrid control centre — hall B, cabinet 14",
    adversaryObjective: "Manipulate telemetry to mask feeder trips",
    attestationState: "current",
    reattestationIntervalDays: 180,
    lastAttestedAt: "2026-06-14T09:12:00Z",
  },
  {
    id: "AST-TEL-03",
    name: "Grid telemetry bus",
    businessCriticality: "high",
    ownerId: currentOwner.id,
    ownerName: currentOwner.name,
    businessUnit: "Grid operations",
    location: "Bilbao substation North — RTU island",
    adversaryObjective: "Pivot from field network into control plane",
    attestationState: "due",
    reattestationIntervalDays: 180,
    lastAttestedAt: "2026-04-02T11:40:00Z",
  },
  {
    id: "AST-BILL-02",
    name: "Customer billing ledger",
    businessCriticality: "high",
    ownerId: "USR-OWNER-RO",
    ownerName: "Raúl Ortiz",
    businessUnit: "Retail energy",
    location: "Valencia DC — rack C12 (owner compartment only)",
    adversaryObjective: "Exfiltrate billing identities for fraud",
    attestationState: "stale",
    reattestationIntervalDays: 180,
    lastAttestedAt: "2026-03-12T16:05:00Z",
  },
  {
    id: "AST-ID-04",
    name: "Privileged identity plane",
    businessCriticality: "crown_jewel",
    ownerId: currentOwner.id,
    ownerName: currentOwner.name,
    businessUnit: "Identity & access",
    location: "Azure West Europe — tenant hidroatlantico-prod",
    adversaryObjective: "Harvest privileged tokens for insider-grade access",
    attestationState: "stale",
    reattestationIntervalDays: 90,
    lastAttestedAt: "2026-01-20T08:00:00Z",
  },
];

export const myAssets = assets.filter((asset) => asset.ownerId === currentOwner.id);

export type CoverageGap = {
  id: string;
  assetId: string;
  description: string;
  surface: string;
  openedAt: string;
  findingId?: string;
  compartment: string;
};

export type DetectionCoverage = {
  assetId: string;
  coverageState: "covered" | "partial" | "uncovered" | "unknown";
  monitoredSurfaces: string[];
  insiderActivityMonitored: boolean;
  lastVerifiedAt: string | null;
  evidenceItemId?: string;
};

export const coverage: DetectionCoverage[] = [
  {
    assetId: "AST-SCADA-01",
    coverageState: "partial",
    monitoredSurfaces: ["endpoint", "network", "privileged_access"],
    insiderActivityMonitored: false,
    lastVerifiedAt: "2026-07-01T00:00:00Z",
    evidenceItemId: "EVD-2026-011",
  },
  {
    assetId: "AST-TEL-03",
    coverageState: "partial",
    monitoredSurfaces: ["network"],
    insiderActivityMonitored: false,
    lastVerifiedAt: "2026-07-01T00:00:00Z",
    evidenceItemId: "EVD-2026-011",
  },
  {
    assetId: "AST-BILL-02",
    coverageState: "unknown",
    monitoredSurfaces: [],
    insiderActivityMonitored: false,
    lastVerifiedAt: null,
  },
  {
    assetId: "AST-ID-04",
    coverageState: "uncovered",
    monitoredSurfaces: ["identity"],
    insiderActivityMonitored: false,
    lastVerifiedAt: "2026-05-11T00:00:00Z",
  },
];

export const coverageGaps: CoverageGap[] = [
  {
    id: "GAP-014",
    assetId: "AST-SCADA-01",
    description: "No insider-activity monitoring on historian admin sessions.",
    surface: "privileged_access",
    openedAt: "2026-07-01T00:00:00Z",
    findingId: "FND-IN-007",
    compartment: "grid-operations",
  },
  {
    id: "GAP-021",
    assetId: "AST-TEL-03",
    description: "Field RTU island has network taps only; no endpoint telemetry.",
    surface: "endpoint",
    openedAt: "2026-07-01T00:00:00Z",
    compartment: "grid-operations",
  },
  {
    id: "GAP-033",
    assetId: "AST-ID-04",
    description: "Privileged token use is logged but not alerted to the SOC.",
    surface: "identity",
    openedAt: "2026-05-11T00:00:00Z",
    findingId: "FND-EX-019",
    compartment: "identity",
  },
];

export type Finding = {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  state: "open" | "overdue" | "closed" | "accepted_risk";
  domains: DomainKey[];
  assetIds: string[];
  ownerId: string;
  ownerName: string;
  dueDate: string;
  origin: string;
  suppressingDomainScore: boolean;
  plan: string;
  closedAt?: string;
};

export const findings: Finding[] = [
  {
    id: "FND-EX-019",
    title: "Privileged identity plane: token replay not detected during sparring",
    severity: "critical",
    state: "open",
    domains: ["resilience", "response_capability"],
    assetIds: ["AST-ID-04"],
    ownerId: "USR-OPS-IR",
    ownerName: "Inés Romero",
    dueDate: "2026-09-30",
    origin: "exercise",
    suppressingDomainScore: true,
    plan: "Deploy privileged-session analytics and re-run Northstar scenario.",
  },
  {
    id: "FND-IN-007",
    title: "Historian admin sessions unmonitored for insider activity",
    severity: "high",
    state: "overdue",
    domains: ["resilience", "risk_exposure"],
    assetIds: ["AST-SCADA-01"],
    ownerId: "USR-OPS-IR",
    ownerName: "Inés Romero",
    dueDate: "2026-08-15",
    origin: "coverage_gap",
    suppressingDomainScore: true,
    plan: "Extend UEBA to SCADA jump hosts; attest coverage scan.",
  },
  {
    id: "FND-AL-001",
    title: "Impact belief (insider) diverges from control spend (perimeter)",
    severity: "high",
    state: "open",
    domains: ["efficient_investment"],
    assetIds: [],
    ownerId: "USR-CISO",
    ownerName: "Elena Vázquez",
    dueDate: "2026-10-31",
    origin: "allocation_divergence",
    suppressingDomainScore: true,
    plan: "Reallocate 2027 opex toward insider detection on named assets.",
  },
  {
    id: "FND-LP-003",
    title: "OMS third-party assessment lapsed without successor voucher",
    severity: "medium",
    state: "open",
    domains: ["extended_ecosystem"],
    assetIds: [],
    ownerId: "USR-TPRM",
    ownerName: "Nuria Beltrán",
    dueDate: "2026-09-20",
    origin: "evidence_lapse",
    suppressingDomainScore: false,
    plan: "Commission 2026 assessment; freeze clause review as interim cap.",
  },
  {
    id: "FND-AU-002",
    title: "Billing ledger attestation cycle missed — coverage claims blocked",
    severity: "medium",
    state: "closed",
    domains: ["risk_exposure"],
    assetIds: ["AST-BILL-02"],
    ownerId: "USR-OWNER-RO",
    ownerName: "Raúl Ortiz",
    dueDate: "2026-04-01",
    origin: "audit",
    suppressingDomainScore: false,
    plan: "Closed after location re-attestation in March; successor now itself expired.",
    closedAt: "2026-03-12T16:20:00Z",
  },
];

export const openFindings = findings.filter((finding) => finding.state === "open" || finding.state === "overdue");
export const lastClosedFinding = findings.find((finding) => finding.state === "closed");

export type IncidentRow = {
  id: string;
  confirmedAt: string;
  severity: "low" | "moderate" | "major" | "critical";
  threatClass: string;
  targeted: boolean;
  objectiveAchievedByAttacker: boolean;
  affectedAssetIds: string[];
  discovererClass: DiscovererClass;
  discoveredAt: string;
  estimatedCompromiseAt: string;
  days: number;
  band: TtdBand;
  recordedBy: string;
};

export const incidents: IncidentRow[] = [
  {
    id: "INC-4412",
    confirmedAt: "2026-06-02T04:18:00Z",
    severity: "major",
    threatClass: "insider",
    targeted: true,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-BILL-02"],
    discovererClass: "other_employee",
    discoveredAt: "2026-06-02T04:18:00Z",
    estimatedCompromiseAt: "2026-03-11T00:00:00Z",
    days: 83,
    band: "months",
    recordedBy: "Incident command",
  },
  {
    id: "INC-4388",
    confirmedAt: "2026-04-19T21:02:00Z",
    severity: "critical",
    threatClass: "external_targeted",
    targeted: true,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-ID-04"],
    discovererClass: "authority_or_regulator",
    discoveredAt: "2026-04-19T21:02:00Z",
    estimatedCompromiseAt: "2025-11-02T00:00:00Z",
    days: 168,
    band: "months",
    recordedBy: "Incident command",
  },
  {
    id: "INC-4301",
    confirmedAt: "2026-02-08T10:40:00Z",
    severity: "moderate",
    threatClass: "external_opportunistic",
    targeted: false,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-TEL-03"],
    discovererClass: "security_function",
    discoveredAt: "2026-02-08T10:40:00Z",
    estimatedCompromiseAt: "2026-02-07T18:00:00Z",
    days: 1,
    band: "hours",
    recordedBy: "SOC intake",
  },
  {
    id: "INC-4274",
    confirmedAt: "2026-01-22T13:11:00Z",
    severity: "major",
    threatClass: "supply_chain",
    targeted: true,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-SCADA-01"],
    discovererClass: "supplier",
    discoveredAt: "2026-01-22T13:11:00Z",
    estimatedCompromiseAt: "2025-12-28T00:00:00Z",
    days: 25,
    band: "weeks",
    recordedBy: "Incident command",
  },
  {
    id: "INC-4190",
    confirmedAt: "2025-11-03T07:55:00Z",
    severity: "critical",
    threatClass: "insider",
    targeted: true,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-ID-04"],
    discovererClass: "external_researcher",
    discoveredAt: "2025-11-03T07:55:00Z",
    estimatedCompromiseAt: "2024-09-18T00:00:00Z",
    days: 411,
    band: "year_or_more",
    recordedBy: "Incident command",
  },
  {
    id: "INC-4102",
    confirmedAt: "2025-09-14T16:00:00Z",
    severity: "moderate",
    threatClass: "external_targeted",
    targeted: true,
    objectiveAchievedByAttacker: true,
    affectedAssetIds: ["AST-BILL-02"],
    discovererClass: "security_function",
    discoveredAt: "2025-09-14T16:00:00Z",
    estimatedCompromiseAt: "2025-09-12T00:00:00Z",
    days: 2,
    band: "days",
    recordedBy: "SOC intake",
  },
];

export const discoveryShare = {
  period: "2025-09-01/2026-08-31",
  confirmedSuccessfulAttacks: 18,
  securityFunctionDiscoveryShare: 0.67,
  byDiscovererClass: [
    { discovererClass: "security_function" as DiscovererClass, count: 12, share: 0.67 },
    { discovererClass: "other_employee" as DiscovererClass, count: 3, share: 0.17 },
    { discovererClass: "authority_or_regulator" as DiscovererClass, count: 1, share: 0.06 },
    { discovererClass: "external_researcher" as DiscovererClass, count: 1, share: 0.06 },
    { discovererClass: "supplier" as DiscovererClass, count: 1, share: 0.06 },
  ],
  targetedAttacksObserved: 94,
  targetedAttacksAchievingObjective: 31,
  successfulAttacksPerMonth: 2.6,
};

export const ttdDistribution = {
  period: "2025-09-01/2026-08-31",
  sampleSize: 18,
  medianDays: 54,
  ninetiethPercentileDays: 186,
  estimatesExcluded: true,
  byBand: [
    { band: "hours" as TtdBand, count: 2, share: 0.11 },
    { band: "days" as TtdBand, count: 3, share: 0.17 },
    { band: "weeks" as TtdBand, count: 2, share: 0.11 },
    { band: "months" as TtdBand, count: 10, share: 0.56 },
    { band: "year_or_more" as TtdBand, count: 1, share: 0.05 },
  ],
};

export type EmulationExercise = {
  id: string;
  status: "scheduled" | "executed" | "deferred" | "missed" | "expired";
  dueDate: string;
  executedAt?: string;
  providerName: string;
  providerIndependent: boolean;
  scopeAssetIds: string[];
  scenario: string;
  outcome?: string;
  detectedByDefenders?: boolean;
  findingIds: string[];
  evidenceItemId?: string;
};

export const exercises: EmulationExercise[] = [
  {
    id: "EMU-2026-04",
    status: "scheduled",
    dueDate: "2026-10-08",
    providerName: "Northstar Sparring",
    providerIndependent: true,
    scopeAssetIds: ["AST-SCADA-01", "AST-TEL-03"],
    scenario: "determined_external_adversary",
    findingIds: [],
  },
  {
    id: "EMU-2026-03",
    status: "executed",
    dueDate: "2026-07-21",
    executedAt: "2026-07-18T16:00:00Z",
    providerName: "Northstar Sparring",
    providerIndependent: true,
    scopeAssetIds: ["AST-ID-04"],
    scenario: "insider_privilege_abuse",
    outcome: "objectives_achieved",
    detectedByDefenders: false,
    findingIds: ["FND-EX-019"],
    evidenceItemId: "EVD-2026-019",
  },
  {
    id: "EMU-2026-02",
    status: "missed",
    dueDate: "2026-05-15",
    providerName: "Northstar Sparring",
    providerIndependent: true,
    scopeAssetIds: ["AST-BILL-02"],
    scenario: "data_exfiltration",
    findingIds: [],
  },
  {
    id: "EMU-2026-01",
    status: "expired",
    dueDate: "2026-01-16",
    executedAt: "2026-01-16T18:00:00Z",
    providerName: "Northstar Sparring",
    providerIndependent: true,
    scopeAssetIds: ["AST-ID-04"],
    scenario: "insider_privilege_abuse",
    outcome: "partially_blocked",
    detectedByDefenders: true,
    findingIds: [],
    evidenceItemId: "EVD-2026-019",
  },
];

export const SCENARIO_LABELS: Record<string, string> = {
  insider_privilege_abuse: "Insider privilege abuse",
  determined_external_adversary: "Determined external adversary",
  supply_chain_entry: "Supply-chain entry",
  ransomware_resilience: "Ransomware resilience",
  data_exfiltration: "Data exfiltration",
};

export type ThreatClass = "insider" | "external_targeted" | "external_opportunistic" | "supply_chain";

export const THREAT_LABELS: Record<ThreatClass, string> = {
  insider: "Insider",
  external_targeted: "External targeted",
  external_opportunistic: "Opportunistic",
  supply_chain: "Supply chain",
};

export const allocation = {
  period: "2026-H1",
  standingFindingRaised: true,
  financeFeedPresent: true,
  beliefs: [
    { threatClass: "insider" as ThreatClass, believedImpactRank: 1, believedShare: 0.43, capturedFrom: "executive_survey", trustInInternalControls: 0.43 },
    { threatClass: "external_targeted" as ThreatClass, believedImpactRank: 2, believedShare: 0.28, capturedFrom: "risk_register", trustInInternalControls: 0.61 },
    { threatClass: "external_opportunistic" as ThreatClass, believedImpactRank: 3, believedShare: 0.18, capturedFrom: "workshop", trustInInternalControls: 0.7 },
    { threatClass: "supply_chain" as ThreatClass, believedImpactRank: 4, believedShare: 0.11, capturedFrom: "committee_minute", trustInInternalControls: 0.52 },
  ],
  investments: [
    { threatClass: "insider" as ThreatClass, share: 0.22, amount: 1_840_000 },
    { threatClass: "external_targeted" as ThreatClass, share: 0.48, amount: 4_020_000 },
    { threatClass: "external_opportunistic" as ThreatClass, share: 0.2, amount: 1_670_000 },
    { threatClass: "supply_chain" as ThreatClass, share: 0.1, amount: 840_000 },
  ],
  divergences: [
    {
      threatClass: "insider" as ThreatClass,
      believedImpactShare: 0.43,
      actualInvestmentShare: 0.22,
      divergencePoints: 0.21,
      findingId: "FND-AL-001",
    },
  ],
};

export type StatementClaim = {
  domain: DomainKey;
  score: number;
  narrative: string;
  supportingEvidenceIds: string[];
  capAtPublication: number;
};

export const draftClaims: StatementClaim[] = domainScores.map((score) => ({
  domain: score.domain,
  score: score.score,
  narrative: score.narrative,
  supportingEvidenceIds: score.validEvidenceIds,
  capAtPublication: score.cap.cap,
}));

export const publishedStatement = {
  id: "AST-2026-H1",
  period: "2026-H1",
  signedBy: "Elena Vázquez",
  signatoryRole: "CISO",
  signedAt: "2026-07-02T09:00:00Z",
  overallScore: 2.9,
  evidenceBackedShare: 0.58,
  frozenEvidenceStateHash: "sha256:7c1e9b4a0f2d88e1c6a4b9d3e5f0172a",
  immutable: true,
  claims: [
    { domain: "risk_exposure" as DomainKey, score: 3, narrative: "Register current at H1 freeze.", supportingEvidenceIds: ["EVD-2026-004"], capAtPublication: 3 },
    { domain: "governance_and_leadership" as DomainKey, score: 4, narrative: "Culture programme evidenced.", supportingEvidenceIds: ["EVD-2026-002"], capAtPublication: 4 },
    { domain: "strategic_context" as DomainKey, score: 2, narrative: "Adversary-objective mapping incomplete.", supportingEvidenceIds: ["EVD-2026-019"], capAtPublication: 2 },
    { domain: "resilience" as DomainKey, score: 3, narrative: "Recovery test accepted; findings not yet open.", supportingEvidenceIds: ["EVD-2026-007"], capAtPublication: 3 },
    { domain: "response_capability" as DomainKey, score: 4, narrative: "TTX 2026-04 in validity window.", supportingEvidenceIds: ["EVD-2026-001", "EVD-2026-009"], capAtPublication: 4 },
    { domain: "extended_ecosystem" as DomainKey, score: 3, narrative: "OMS assessment still valid at freeze.", supportingEvidenceIds: ["EVD-2026-003"], capAtPublication: 3 },
    { domain: "efficient_investment" as DomainKey, score: 3, narrative: "Spend statement H1 accepted.", supportingEvidenceIds: ["EVD-2026-012"], capAtPublication: 3 },
  ] satisfies StatementClaim[],
};

export type ExportPackage = {
  id: string;
  statementId: string;
  audience: "audit_risk_committee" | "sector_regulator" | "cyber_insurer" | "internal_audit";
  recipient: string;
  generatedAt: string;
  generatedBy: string;
  manifestHash: string;
  claimTraceability: { claimDomain: DomainKey; evidenceItemIds: string[] }[];
};

export const exportPackages: ExportPackage[] = [
  {
    id: "EXP-H1-BOARD",
    statementId: publishedStatement.id,
    audience: "audit_risk_committee",
    recipient: "Audit & risk committee — HidroAtlántico",
    generatedAt: "2026-07-02T09:40:00Z",
    generatedBy: "Martín Soler",
    manifestHash: "sha256:a91c0e77b2",
    claimTraceability: publishedStatement.claims.map((claim) => ({
      claimDomain: claim.domain,
      evidenceItemIds: claim.supportingEvidenceIds,
    })),
  },
  {
    id: "EXP-H1-CNMC",
    statementId: publishedStatement.id,
    audience: "sector_regulator",
    recipient: "CNMC — cybersecurity return",
    generatedAt: "2026-07-02T10:05:00Z",
    generatedBy: "Martín Soler",
    manifestHash: "sha256:b04d19aa11",
    claimTraceability: publishedStatement.claims.map((claim) => ({
      claimDomain: claim.domain,
      evidenceItemIds: claim.supportingEvidenceIds,
    })),
  },
  {
    id: "EXP-H1-INS",
    statementId: publishedStatement.id,
    audience: "cyber_insurer",
    recipient: "Cyber proposal desk — Mapfre / broker",
    generatedAt: "2026-07-03T08:15:00Z",
    generatedBy: "Legal liaison",
    manifestHash: "sha256:cc12e90f4d",
    claimTraceability: publishedStatement.claims.map((claim) => ({
      claimDomain: claim.domain,
      evidenceItemIds: claim.supportingEvidenceIds,
    })),
  },
];

export const AUDIENCE_LABELS: Record<ExportPackage["audience"], string> = {
  audit_risk_committee: "Committee pack",
  sector_regulator: "Regulatory return",
  cyber_insurer: "Insurance proposal",
  internal_audit: "Internal audit",
};

export type RuleDiff = {
  id: string;
  setting: string;
  previous: string;
  next: string;
  approval: {
    approvedBy: string;
    approverRole: string;
    approvedAt: string;
    minuteReference: string;
    rationale: string;
  };
};

export const governanceSettings = {
  ownedBy: "audit_risk_committee" as const,
  capOnOpenCriticalFinding: 2,
  capOnStaleAttestation: 2,
  validityRules: [
    { evidenceTypeKey: "asset_attestation", validityDays: 180, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "emulation_exercise_report", validityDays: 180, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "response_plan_test", validityDays: 180, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "recovery_plan_test", validityDays: 365, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "detection_coverage_scan", validityDays: 90, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "third_party_assessment", validityDays: 365, setBy: "Sofía Alarcón" },
    { evidenceTypeKey: "control_spend_statement", validityDays: 180, setBy: "Sofía Alarcón" },
  ],
  domainWeightings: DOMAIN_KEYS.map((key) => ({ domain: key, weighting: 1 / 7 })),
  lastApproval: {
    approvedBy: "Sofía Alarcón",
    approverRole: "Audit & risk committee chair",
    approvedAt: "2026-06-11T16:30:00Z",
    minuteReference: "ARC-2026-06-11 §4.2",
    rationale: "Shorten coverage-scan validity so detection claims cannot winter over.",
  },
};

export const ruleDiffs: RuleDiff[] = [
  {
    id: "GOV-2026-06",
    setting: "detection_coverage_scan.validityDays",
    previous: "180 days",
    next: "90 days",
    approval: governanceSettings.lastApproval,
  },
  {
    id: "GOV-2026-03",
    setting: "capOnOpenCriticalFinding",
    previous: "3",
    next: "2",
    approval: {
      approvedBy: "Sofía Alarcón",
      approverRole: "Audit & risk committee chair",
      approvedAt: "2026-03-19T15:00:00Z",
      minuteReference: "ARC-2026-03-19 §3.1",
      rationale: "Critical open findings must floor resilience rather than merely annotate it.",
    },
  },
];

export const accessLogNotice =
  "Access to this compartment is logged. Assembled asset, gap, and exercise records are a target-selection document.";

export function assetName(id: string): string {
  return assets.find((asset) => asset.id === id)?.name ?? id;
}

export function evidenceForDomain(key: DomainKey) {
  return evidenceItems.filter((item) => item.domains.includes(key));
}

export function findingsForDomain(key: DomainKey) {
  return findings.filter((item) => item.domains.includes(key));
}

export function coverageForAsset(id: string) {
  return coverage.find((item) => item.assetId === id);
}
