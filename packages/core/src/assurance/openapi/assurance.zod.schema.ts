import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const signAssuranceStatement_Body = z
  .object({
    period: z.string(),
    claims: z.array(
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
          score: z.number().int(),
          narrative: z.string().optional(),
          supportingEvidenceIds: z.array(z.string()).optional(),
          capAtPublication: z.number().int().optional(),
        })
        .passthrough()
    ),
    signedBy: z.string(),
    signatoryRole: z.string().optional(),
  })
  .passthrough();
const exportAssurancePackage_Body = z
  .object({
    audience: z.enum([
      'audit_risk_committee',
      'sector_regulator',
      'cyber_insurer',
      'internal_audit',
    ]),
    recipient: z.string().optional(),
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
const StatementClaim = z
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
    score: z.number().int(),
    narrative: z.string().optional(),
    supportingEvidenceIds: z.array(z.string()).optional(),
    capAtPublication: z.number().int().optional(),
  })
  .passthrough();
const DiscoveryShareReport = z
  .object({
    period: z.string(),
    confirmedSuccessfulAttacks: z.number().int(),
    securityFunctionDiscoveryShare: z.number(),
    byDiscovererClass: z.array(
      z
        .object({
          discovererClass: z.string(),
          count: z.number().int(),
          share: z.number(),
        })
        .partial()
        .passthrough()
    ),
    targetedAttacksObserved: z.number().int(),
    targetedAttacksAchievingObjective: z.number().int(),
    successfulAttacksPerMonth: z.number(),
  })
  .partial()
  .passthrough();
const ContractualClause = z
  .object({
    clauseType: z.enum([
      'notification_deadline',
      'audit_right',
      'subprocessor_control',
      'recovery_obligation',
      'regulatory_compliance',
    ]),
    present: z.boolean(),
    reviewedAt: z.string(),
  })
  .partial()
  .passthrough();
const ThirdPartyAssessment = z
  .object({
    supplierId: z.string(),
    supplierName: z.string(),
    assessedAt: z.string().datetime({ offset: true }),
    validUntil: z.string().datetime({ offset: true }),
    crisisCollaborationTested: z.boolean(),
    clauses: z.array(
      z
        .object({
          clauseType: z.enum([
            'notification_deadline',
            'audit_right',
            'subprocessor_control',
            'recovery_obligation',
            'regulatory_compliance',
          ]),
          present: z.boolean(),
          reviewedAt: z.string(),
        })
        .partial()
        .passthrough()
    ),
  })
  .partial()
  .passthrough();
const AssuranceStatement = z
  .object({
    id: z.string(),
    period: z.string(),
    signedBy: z.string(),
    signatoryRole: z.string().optional(),
    signedAt: z.string().datetime({ offset: true }),
    claims: z
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
            score: z.number().int(),
            narrative: z.string().optional(),
            supportingEvidenceIds: z.array(z.string()).optional(),
            capAtPublication: z.number().int().optional(),
          })
          .passthrough()
      )
      .optional(),
    overallScore: z.number().optional(),
    evidenceBackedShare: z.number().optional(),
    discoveryShare: z
      .object({
        period: z.string(),
        confirmedSuccessfulAttacks: z.number().int(),
        securityFunctionDiscoveryShare: z.number(),
        byDiscovererClass: z.array(
          z
            .object({
              discovererClass: z.string(),
              count: z.number().int(),
              share: z.number(),
            })
            .partial()
            .passthrough()
        ),
        targetedAttacksObserved: z.number().int(),
        targetedAttacksAchievingObjective: z.number().int(),
        successfulAttacksPerMonth: z.number(),
      })
      .partial()
      .passthrough()
      .optional(),
    extendedEcosystemAssessments: z
      .array(
        z
          .object({
            supplierId: z.string(),
            supplierName: z.string(),
            assessedAt: z.string().datetime({ offset: true }),
            validUntil: z.string().datetime({ offset: true }),
            crisisCollaborationTested: z.boolean(),
            clauses: z.array(
              z
                .object({
                  clauseType: z.enum([
                    'notification_deadline',
                    'audit_right',
                    'subprocessor_control',
                    'recovery_obligation',
                    'regulatory_compliance',
                  ]),
                  present: z.boolean(),
                  reviewedAt: z.string(),
                })
                .partial()
                .passthrough()
            ),
          })
          .partial()
          .passthrough()
      )
      .optional(),
    frozenEvidenceStateHash: z.string().optional(),
    immutable: z.boolean().optional().default(true),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ListEnvelopeAssuranceStatement = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              period: z.string(),
              signedBy: z.string(),
              signatoryRole: z.string().optional(),
              signedAt: z.string().datetime({ offset: true }),
              claims: z
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
                      score: z.number().int(),
                      narrative: z.string().optional(),
                      supportingEvidenceIds: z.array(z.string()).optional(),
                      capAtPublication: z.number().int().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              overallScore: z.number().optional(),
              evidenceBackedShare: z.number().optional(),
              discoveryShare: z
                .object({
                  period: z.string(),
                  confirmedSuccessfulAttacks: z.number().int(),
                  securityFunctionDiscoveryShare: z.number(),
                  byDiscovererClass: z.array(
                    z
                      .object({
                        discovererClass: z.string(),
                        count: z.number().int(),
                        share: z.number(),
                      })
                      .partial()
                      .passthrough()
                  ),
                  targetedAttacksObserved: z.number().int(),
                  targetedAttacksAchievingObjective: z.number().int(),
                  successfulAttacksPerMonth: z.number(),
                })
                .partial()
                .passthrough()
                .optional(),
              extendedEcosystemAssessments: z
                .array(
                  z
                    .object({
                      supplierId: z.string(),
                      supplierName: z.string(),
                      assessedAt: z.string().datetime({ offset: true }),
                      validUntil: z.string().datetime({ offset: true }),
                      crisisCollaborationTested: z.boolean(),
                      clauses: z.array(
                        z
                          .object({
                            clauseType: z.enum([
                              'notification_deadline',
                              'audit_right',
                              'subprocessor_control',
                              'recovery_obligation',
                              'regulatory_compliance',
                            ]),
                            present: z.boolean(),
                            reviewedAt: z.string(),
                          })
                          .partial()
                          .passthrough()
                      ),
                    })
                    .partial()
                    .passthrough()
                )
                .optional(),
              frozenEvidenceStateHash: z.string().optional(),
              immutable: z.boolean().optional().default(true),
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
const AssuranceStatementCreate = z
  .object({
    period: z.string(),
    claims: z.array(
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
          score: z.number().int(),
          narrative: z.string().optional(),
          supportingEvidenceIds: z.array(z.string()).optional(),
          capAtPublication: z.number().int().optional(),
        })
        .passthrough()
    ),
    signedBy: z.string(),
    signatoryRole: z.string().optional(),
  })
  .passthrough();
const DataEnvelopeAssuranceStatement = z
  .object({
    data: z
      .object({
        id: z.string(),
        period: z.string(),
        signedBy: z.string(),
        signatoryRole: z.string().optional(),
        signedAt: z.string().datetime({ offset: true }),
        claims: z
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
                score: z.number().int(),
                narrative: z.string().optional(),
                supportingEvidenceIds: z.array(z.string()).optional(),
                capAtPublication: z.number().int().optional(),
              })
              .passthrough()
          )
          .optional(),
        overallScore: z.number().optional(),
        evidenceBackedShare: z.number().optional(),
        discoveryShare: z
          .object({
            period: z.string(),
            confirmedSuccessfulAttacks: z.number().int(),
            securityFunctionDiscoveryShare: z.number(),
            byDiscovererClass: z.array(
              z
                .object({
                  discovererClass: z.string(),
                  count: z.number().int(),
                  share: z.number(),
                })
                .partial()
                .passthrough()
            ),
            targetedAttacksObserved: z.number().int(),
            targetedAttacksAchievingObjective: z.number().int(),
            successfulAttacksPerMonth: z.number(),
          })
          .partial()
          .passthrough()
          .optional(),
        extendedEcosystemAssessments: z
          .array(
            z
              .object({
                supplierId: z.string(),
                supplierName: z.string(),
                assessedAt: z.string().datetime({ offset: true }),
                validUntil: z.string().datetime({ offset: true }),
                crisisCollaborationTested: z.boolean(),
                clauses: z.array(
                  z
                    .object({
                      clauseType: z.enum([
                        'notification_deadline',
                        'audit_right',
                        'subprocessor_control',
                        'recovery_obligation',
                        'regulatory_compliance',
                      ]),
                      present: z.boolean(),
                      reviewedAt: z.string(),
                    })
                    .partial()
                    .passthrough()
                ),
              })
              .partial()
              .passthrough()
          )
          .optional(),
        frozenEvidenceStateHash: z.string().optional(),
        immutable: z.boolean().optional().default(true),
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
const ExportPackage = z
  .object({
    id: z.string(),
    statementId: z.string(),
    audience: z.enum([
      'audit_risk_committee',
      'sector_regulator',
      'cyber_insurer',
      'internal_audit',
    ]),
    recipient: z.string().optional(),
    generatedAt: z.string().datetime({ offset: true }),
    generatedBy: z.string().optional(),
    manifestHash: z.string().optional(),
    claimTraceability: z
      .array(
        z
          .object({
            claimDomain: z.enum([
              'risk_exposure',
              'governance_and_leadership',
              'strategic_context',
              'resilience',
              'response_capability',
              'extended_ecosystem',
              'efficient_investment',
            ]),
            evidenceItemIds: z.array(z.string()),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const DataEnvelopeExportPackage = z
  .object({
    data: z
      .object({
        id: z.string(),
        statementId: z.string(),
        audience: z.enum([
          'audit_risk_committee',
          'sector_regulator',
          'cyber_insurer',
          'internal_audit',
        ]),
        recipient: z.string().optional(),
        generatedAt: z.string().datetime({ offset: true }),
        generatedBy: z.string().optional(),
        manifestHash: z.string().optional(),
        claimTraceability: z
          .array(
            z
              .object({
                claimDomain: z.enum([
                  'risk_exposure',
                  'governance_and_leadership',
                  'strategic_context',
                  'resilience',
                  'response_capability',
                  'extended_ecosystem',
                  'efficient_investment',
                ]),
                evidenceItemIds: z.array(z.string()),
              })
              .partial()
              .passthrough()
          )
          .optional(),
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
  signAssuranceStatement_Body,
  exportAssurancePackage_Body,
  DomainKey,
  StatementClaim,
  DiscoveryShareReport,
  ContractualClause,
  ThirdPartyAssessment,
  AssuranceStatement,
  ResponseMeta,
  ListEnvelopeAssuranceStatement,
  Problem,
  AssuranceStatementCreate,
  DataEnvelopeAssuranceStatement,
  ExportPackage,
  DataEnvelopeExportPackage,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/assurance/statements',
    alias: 'listAssuranceStatements',
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
                  id: z.string(),
                  period: z.string(),
                  signedBy: z.string(),
                  signatoryRole: z.string().optional(),
                  signedAt: z.string().datetime({ offset: true }),
                  claims: z
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
                          score: z.number().int(),
                          narrative: z.string().optional(),
                          supportingEvidenceIds: z.array(z.string()).optional(),
                          capAtPublication: z.number().int().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  overallScore: z.number().optional(),
                  evidenceBackedShare: z.number().optional(),
                  discoveryShare: z
                    .object({
                      period: z.string(),
                      confirmedSuccessfulAttacks: z.number().int(),
                      securityFunctionDiscoveryShare: z.number(),
                      byDiscovererClass: z.array(
                        z
                          .object({
                            discovererClass: z.string(),
                            count: z.number().int(),
                            share: z.number(),
                          })
                          .partial()
                          .passthrough()
                      ),
                      targetedAttacksObserved: z.number().int(),
                      targetedAttacksAchievingObjective: z.number().int(),
                      successfulAttacksPerMonth: z.number(),
                    })
                    .partial()
                    .passthrough()
                    .optional(),
                  extendedEcosystemAssessments: z
                    .array(
                      z
                        .object({
                          supplierId: z.string(),
                          supplierName: z.string(),
                          assessedAt: z.string().datetime({ offset: true }),
                          validUntil: z.string().datetime({ offset: true }),
                          crisisCollaborationTested: z.boolean(),
                          clauses: z.array(
                            z
                              .object({
                                clauseType: z.enum([
                                  'notification_deadline',
                                  'audit_right',
                                  'subprocessor_control',
                                  'recovery_obligation',
                                  'regulatory_compliance',
                                ]),
                                present: z.boolean(),
                                reviewedAt: z.string(),
                              })
                              .partial()
                              .passthrough()
                          ),
                        })
                        .partial()
                        .passthrough()
                    )
                    .optional(),
                  frozenEvidenceStateHash: z.string().optional(),
                  immutable: z.boolean().optional().default(true),
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
    method: 'post',
    path: '/v1/assurance/statements',
    alias: 'signAssuranceStatement',
    description: `Signs and freezes the statement together with the exact evidence validity state at the moment of publication. Immutable thereafter.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: signAssuranceStatement_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            period: z.string(),
            signedBy: z.string(),
            signatoryRole: z.string().optional(),
            signedAt: z.string().datetime({ offset: true }),
            claims: z
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
                    score: z.number().int(),
                    narrative: z.string().optional(),
                    supportingEvidenceIds: z.array(z.string()).optional(),
                    capAtPublication: z.number().int().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            overallScore: z.number().optional(),
            evidenceBackedShare: z.number().optional(),
            discoveryShare: z
              .object({
                period: z.string(),
                confirmedSuccessfulAttacks: z.number().int(),
                securityFunctionDiscoveryShare: z.number(),
                byDiscovererClass: z.array(
                  z
                    .object({
                      discovererClass: z.string(),
                      count: z.number().int(),
                      share: z.number(),
                    })
                    .partial()
                    .passthrough()
                ),
                targetedAttacksObserved: z.number().int(),
                targetedAttacksAchievingObjective: z.number().int(),
                successfulAttacksPerMonth: z.number(),
              })
              .partial()
              .passthrough()
              .optional(),
            extendedEcosystemAssessments: z
              .array(
                z
                  .object({
                    supplierId: z.string(),
                    supplierName: z.string(),
                    assessedAt: z.string().datetime({ offset: true }),
                    validUntil: z.string().datetime({ offset: true }),
                    crisisCollaborationTested: z.boolean(),
                    clauses: z.array(
                      z
                        .object({
                          clauseType: z.enum([
                            'notification_deadline',
                            'audit_right',
                            'subprocessor_control',
                            'recovery_obligation',
                            'regulatory_compliance',
                          ]),
                          present: z.boolean(),
                          reviewedAt: z.string(),
                        })
                        .partial()
                        .passthrough()
                    ),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            frozenEvidenceStateHash: z.string().optional(),
            immutable: z.boolean().optional().default(true),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    method: 'post',
    path: '/v1/assurance/statements/:statementId/exports',
    alias: 'exportAssurancePackage',
    description: `Generates the committee pack, regulatory return, or insurance proposal response from the one frozen evidence base, with claim-level traceability.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: exportAssurancePackage_Body,
      },
      {
        name: 'statementId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            statementId: z.string(),
            audience: z.enum([
              'audit_risk_committee',
              'sector_regulator',
              'cyber_insurer',
              'internal_audit',
            ]),
            recipient: z.string().optional(),
            generatedAt: z.string().datetime({ offset: true }),
            generatedBy: z.string().optional(),
            manifestHash: z.string().optional(),
            claimTraceability: z
              .array(
                z
                  .object({
                    claimDomain: z.enum([
                      'risk_exposure',
                      'governance_and_leadership',
                      'strategic_context',
                      'resilience',
                      'response_capability',
                      'extended_ecosystem',
                      'efficient_investment',
                    ]),
                    evidenceItemIds: z.array(z.string()),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
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
