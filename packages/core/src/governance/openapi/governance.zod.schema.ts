import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const updateGovernanceSettings_Body = z
  .object({
    validityRules: z
      .array(
        z
          .object({
            evidenceTypeKey: z.string(),
            validityDays: z.number().int(),
            setBy: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    capOnOpenCriticalFinding: z.number().int().optional(),
    capOnStaleAttestation: z.number().int().optional(),
    domainWeightings: z
      .array(
        z
          .object({
            domain: z.enum([
              'risk_exposure',
              'governance_and_leadership',
              'strategic_context',
              'resilience',
              'response_capability',
              'extended_ecosystem',
              'efficient_investment',
            ]),
            weighting: z.number(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
    approval: z
      .object({
        approvedBy: z.string(),
        approverRole: z.string().optional(),
        approvedAt: z.string().datetime({ offset: true }),
        minuteReference: z.string().optional(),
        rationale: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();
const ValidityRule = z
  .object({
    evidenceTypeKey: z.string(),
    validityDays: z.number().int(),
    setBy: z.string().optional(),
  })
  .passthrough();
const EvidenceType = z
  .object({
    key: z.enum([
      'asset_attestation',
      'emulation_exercise_report',
      'response_plan_test',
      'recovery_plan_test',
      'detection_coverage_scan',
      'escalation_path_test',
      'third_party_assessment',
      'contractual_clause_review',
      'control_spend_statement',
      'training_completion',
      'incident_postmortem',
    ]),
    label: z.string(),
    defaultValidityDays: z.number().int().optional(),
  })
  .passthrough();
const DomainKey = z.enum([
  'risk_exposure',
  'governance_and_leadership',
  'strategic_context',
  'resilience',
  'response_capability',
  'extended_ecosystem',
  'efficient_investment',
]);
const Domain = z
  .object({
    key: z.enum([
      'risk_exposure',
      'governance_and_leadership',
      'strategic_context',
      'resilience',
      'response_capability',
      'extended_ecosystem',
      'efficient_investment',
    ]),
    name: z.string(),
    description: z.string().optional(),
    weighting: z.number().optional(),
  })
  .passthrough();
const ApprovalRecord = z
  .object({
    approvedBy: z.string(),
    approverRole: z.string().optional(),
    approvedAt: z.string().datetime({ offset: true }),
    minuteReference: z.string().optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const GovernanceSetting = z
  .object({
    validityRules: z.array(
      z
        .object({
          evidenceTypeKey: z.string(),
          validityDays: z.number().int(),
          setBy: z.string().optional(),
        })
        .passthrough()
    ),
    evidenceTypes: z.array(
      z
        .object({
          key: z.enum([
            'asset_attestation',
            'emulation_exercise_report',
            'response_plan_test',
            'recovery_plan_test',
            'detection_coverage_scan',
            'escalation_path_test',
            'third_party_assessment',
            'contractual_clause_review',
            'control_spend_statement',
            'training_completion',
            'incident_postmortem',
          ]),
          label: z.string(),
          defaultValidityDays: z.number().int().optional(),
        })
        .passthrough()
    ),
    domains: z.array(
      z
        .object({
          key: z.enum([
            'risk_exposure',
            'governance_and_leadership',
            'strategic_context',
            'resilience',
            'response_capability',
            'extended_ecosystem',
            'efficient_investment',
          ]),
          name: z.string(),
          description: z.string().optional(),
          weighting: z.number().optional(),
        })
        .passthrough()
    ),
    capOnOpenCriticalFinding: z.number().int(),
    capOnStaleAttestation: z.number().int(),
    ownedBy: z.literal('audit_risk_committee'),
    lastApproval: z
      .object({
        approvedBy: z.string(),
        approverRole: z.string().optional(),
        approvedAt: z.string().datetime({ offset: true }),
        minuteReference: z.string().optional(),
        rationale: z.string().optional(),
      })
      .passthrough(),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DataEnvelopeGovernanceSetting = z
  .object({
    data: z
      .object({
        validityRules: z.array(
          z
            .object({
              evidenceTypeKey: z.string(),
              validityDays: z.number().int(),
              setBy: z.string().optional(),
            })
            .passthrough()
        ),
        evidenceTypes: z.array(
          z
            .object({
              key: z.enum([
                'asset_attestation',
                'emulation_exercise_report',
                'response_plan_test',
                'recovery_plan_test',
                'detection_coverage_scan',
                'escalation_path_test',
                'third_party_assessment',
                'contractual_clause_review',
                'control_spend_statement',
                'training_completion',
                'incident_postmortem',
              ]),
              label: z.string(),
              defaultValidityDays: z.number().int().optional(),
            })
            .passthrough()
        ),
        domains: z.array(
          z
            .object({
              key: z.enum([
                'risk_exposure',
                'governance_and_leadership',
                'strategic_context',
                'resilience',
                'response_capability',
                'extended_ecosystem',
                'efficient_investment',
              ]),
              name: z.string(),
              description: z.string().optional(),
              weighting: z.number().optional(),
            })
            .passthrough()
        ),
        capOnOpenCriticalFinding: z.number().int(),
        capOnStaleAttestation: z.number().int(),
        ownedBy: z.literal('audit_risk_committee'),
        lastApproval: z
          .object({
            approvedBy: z.string(),
            approverRole: z.string().optional(),
            approvedAt: z.string().datetime({ offset: true }),
            minuteReference: z.string().optional(),
            rationale: z.string().optional(),
          })
          .passthrough(),
      })
      .partial()
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const GovernanceSettingUpdate = z
  .object({
    validityRules: z
      .array(
        z
          .object({
            evidenceTypeKey: z.string(),
            validityDays: z.number().int(),
            setBy: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    capOnOpenCriticalFinding: z.number().int().optional(),
    capOnStaleAttestation: z.number().int().optional(),
    domainWeightings: z
      .array(
        z
          .object({
            domain: z.enum([
              'risk_exposure',
              'governance_and_leadership',
              'strategic_context',
              'resilience',
              'response_capability',
              'extended_ecosystem',
              'efficient_investment',
            ]),
            weighting: z.number(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
    approval: z
      .object({
        approvedBy: z.string(),
        approverRole: z.string().optional(),
        approvedAt: z.string().datetime({ offset: true }),
        minuteReference: z.string().optional(),
        rationale: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();
const AccessLogEntry = z
  .object({
    at: z.string().datetime({ offset: true }),
    actor: z.string(),
    resourceType: z.enum([
      'priority_asset',
      'coverage_gap',
      'exercise_finding',
      'assurance_statement',
      'export_package',
    ]),
    resourceId: z.string().optional(),
    compartment: z.string().optional(),
    outcome: z.enum(['allowed', 'denied']).optional(),
  })
  .passthrough();
const ListEnvelopeAccessLogEntry = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              at: z.string().datetime({ offset: true }),
              actor: z.string(),
              resourceType: z.enum([
                'priority_asset',
                'coverage_gap',
                'exercise_finding',
                'assurance_statement',
                'export_package',
              ]),
              resourceId: z.string().optional(),
              compartment: z.string().optional(),
              outcome: z.enum(['allowed', 'denied']).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();

export const schemas: any = {
  updateGovernanceSettings_Body,
  ValidityRule,
  EvidenceType,
  DomainKey,
  Domain,
  ApprovalRecord,
  GovernanceSetting,
  ResponseMeta,
  DataEnvelopeGovernanceSetting,
  Problem,
  GovernanceSettingUpdate,
  AccessLogEntry,
  ListEnvelopeAccessLogEntry,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/governance/access-log',
    alias: 'listAccessLog',
    description: `Reads of the asset register, coverage gaps, and exercise findings are recorded and reviewable.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  at: z.string().datetime({ offset: true }),
                  actor: z.string(),
                  resourceType: z.enum([
                    'priority_asset',
                    'coverage_gap',
                    'exercise_finding',
                    'assurance_statement',
                    'export_package',
                  ]),
                  resourceId: z.string().optional(),
                  compartment: z.string().optional(),
                  outcome: z.enum(['allowed', 'denied']).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/governance/settings',
    alias: 'getGovernanceSettings',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            validityRules: z.array(
              z
                .object({
                  evidenceTypeKey: z.string(),
                  validityDays: z.number().int(),
                  setBy: z.string().optional(),
                })
                .passthrough()
            ),
            evidenceTypes: z.array(
              z
                .object({
                  key: z.enum([
                    'asset_attestation',
                    'emulation_exercise_report',
                    'response_plan_test',
                    'recovery_plan_test',
                    'detection_coverage_scan',
                    'escalation_path_test',
                    'third_party_assessment',
                    'contractual_clause_review',
                    'control_spend_statement',
                    'training_completion',
                    'incident_postmortem',
                  ]),
                  label: z.string(),
                  defaultValidityDays: z.number().int().optional(),
                })
                .passthrough()
            ),
            domains: z.array(
              z
                .object({
                  key: z.enum([
                    'risk_exposure',
                    'governance_and_leadership',
                    'strategic_context',
                    'resilience',
                    'response_capability',
                    'extended_ecosystem',
                    'efficient_investment',
                  ]),
                  name: z.string(),
                  description: z.string().optional(),
                  weighting: z.number().optional(),
                })
                .passthrough()
            ),
            capOnOpenCriticalFinding: z.number().int(),
            capOnStaleAttestation: z.number().int(),
            ownedBy: z.literal('audit_risk_committee'),
            lastApproval: z
              .object({
                approvedBy: z.string(),
                approverRole: z.string().optional(),
                approvedAt: z.string().datetime({ offset: true }),
                minuteReference: z.string().optional(),
                rationale: z.string().optional(),
              })
              .passthrough(),
          })
          .partial()
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'put',
    path: '/v1/governance/settings',
    alias: 'updateGovernanceSettings',
    description: `Requires the committee scope. The scored security function cannot alter the mechanism by which it is measured.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateGovernanceSettings_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            validityRules: z.array(
              z
                .object({
                  evidenceTypeKey: z.string(),
                  validityDays: z.number().int(),
                  setBy: z.string().optional(),
                })
                .passthrough()
            ),
            evidenceTypes: z.array(
              z
                .object({
                  key: z.enum([
                    'asset_attestation',
                    'emulation_exercise_report',
                    'response_plan_test',
                    'recovery_plan_test',
                    'detection_coverage_scan',
                    'escalation_path_test',
                    'third_party_assessment',
                    'contractual_clause_review',
                    'control_spend_statement',
                    'training_completion',
                    'incident_postmortem',
                  ]),
                  label: z.string(),
                  defaultValidityDays: z.number().int().optional(),
                })
                .passthrough()
            ),
            domains: z.array(
              z
                .object({
                  key: z.enum([
                    'risk_exposure',
                    'governance_and_leadership',
                    'strategic_context',
                    'resilience',
                    'response_capability',
                    'extended_ecosystem',
                    'efficient_investment',
                  ]),
                  name: z.string(),
                  description: z.string().optional(),
                  weighting: z.number().optional(),
                })
                .passthrough()
            ),
            capOnOpenCriticalFinding: z.number().int(),
            capOnStaleAttestation: z.number().int(),
            ownedBy: z.literal('audit_risk_committee'),
            lastApproval: z
              .object({
                approvedBy: z.string(),
                approverRole: z.string().optional(),
                approvedAt: z.string().datetime({ offset: true }),
                minuteReference: z.string().optional(),
                rationale: z.string().optional(),
              })
              .passthrough(),
          })
          .partial()
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
    errors: [
      {
        status: 403,
        description: `Authenticated but not permitted`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios('https://api.vouchstone.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
