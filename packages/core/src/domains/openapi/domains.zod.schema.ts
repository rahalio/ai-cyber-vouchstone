import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const proposeDomainClaim_Body = z
  .object({
    claimedScore: z.number().int().gte(1).lte(5),
    narrative: z.string(),
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
const ScoreCap = z
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
    cap: z.number().int().gte(1).lte(5),
    reason: z.enum([
      'insufficient_evidence',
      'evidence_expired',
      'open_findings',
      'attestation_stale',
      'never_exercised',
    ]),
    contributingFindingIds: z.array(z.string()),
  })
  .partial()
  .passthrough();
const DomainScore = z
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
    score: z.number().int().gte(1).lte(5),
    claimedScore: z.number().int().optional(),
    cap: z
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
        cap: z.number().int().gte(1).lte(5),
        reason: z.enum([
          'insufficient_evidence',
          'evidence_expired',
          'open_findings',
          'attestation_stale',
          'never_exercised',
        ]),
        contributingFindingIds: z.array(z.string()),
      })
      .partial()
      .passthrough(),
    evidenceBackedShare: z.number().optional(),
    validEvidenceIds: z.array(z.string()).optional(),
    lapsedEvidenceIds: z.array(z.string()).optional(),
    narrative: z.string().optional(),
    computedAt: z.string().datetime({ offset: true }).optional(),
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
const ListEnvelopeDomainScore = z
  .object({
    data: z
      .object({
        items: z.array(
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
              score: z.number().int().gte(1).lte(5),
              claimedScore: z.number().int().optional(),
              cap: z
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
                  cap: z.number().int().gte(1).lte(5),
                  reason: z.enum([
                    'insufficient_evidence',
                    'evidence_expired',
                    'open_findings',
                    'attestation_stale',
                    'never_exercised',
                  ]),
                  contributingFindingIds: z.array(z.string()),
                })
                .partial()
                .passthrough(),
              evidenceBackedShare: z.number().optional(),
              validEvidenceIds: z.array(z.string()).optional(),
              lapsedEvidenceIds: z.array(z.string()).optional(),
              narrative: z.string().optional(),
              computedAt: z.string().datetime({ offset: true }).optional(),
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
const DataEnvelopeDomainScore = z
  .object({
    data: z
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
        score: z.number().int().gte(1).lte(5),
        claimedScore: z.number().int().optional(),
        cap: z
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
            cap: z.number().int().gte(1).lte(5),
            reason: z.enum([
              'insufficient_evidence',
              'evidence_expired',
              'open_findings',
              'attestation_stale',
              'never_exercised',
            ]),
            contributingFindingIds: z.array(z.string()),
          })
          .partial()
          .passthrough(),
        evidenceBackedShare: z.number().optional(),
        validEvidenceIds: z.array(z.string()).optional(),
        lapsedEvidenceIds: z.array(z.string()).optional(),
        narrative: z.string().optional(),
        computedAt: z.string().datetime({ offset: true }).optional(),
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
  proposeDomainClaim_Body,
  DomainKey,
  ScoreCap,
  DomainScore,
  ResponseMeta,
  ListEnvelopeDomainScore,
  Problem,
  DataEnvelopeDomainScore,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/domains/:domainKey/claim',
    alias: 'proposeDomainClaim',
    description: `Propose a posture claim for a domain. Rejected when the claim exceeds the evidence cap, including when proposed by the accountable executive.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: proposeDomainClaim_Body,
      },
      {
        name: 'domainKey',
        type: 'Path',
        schema: z.enum([
          'risk_exposure',
          'governance_and_leadership',
          'strategic_context',
          'resilience',
          'response_capability',
          'extended_ecosystem',
          'efficient_investment',
        ]),
      },
    ],
    response: z
      .object({
        data: z
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
            score: z.number().int().gte(1).lte(5),
            claimedScore: z.number().int().optional(),
            cap: z
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
                cap: z.number().int().gte(1).lte(5),
                reason: z.enum([
                  'insufficient_evidence',
                  'evidence_expired',
                  'open_findings',
                  'attestation_stale',
                  'never_exercised',
                ]),
                contributingFindingIds: z.array(z.string()),
              })
              .partial()
              .passthrough(),
            evidenceBackedShare: z.number().optional(),
            validEvidenceIds: z.array(z.string()).optional(),
            lapsedEvidenceIds: z.array(z.string()).optional(),
            narrative: z.string().optional(),
            computedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/domains/:domainKey/score',
    alias: 'getDomainScore',
    requestFormat: 'json',
    parameters: [
      {
        name: 'domainKey',
        type: 'Path',
        schema: z.enum([
          'risk_exposure',
          'governance_and_leadership',
          'strategic_context',
          'resilience',
          'response_capability',
          'extended_ecosystem',
          'efficient_investment',
        ]),
      },
    ],
    response: z
      .object({
        data: z
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
            score: z.number().int().gte(1).lte(5),
            claimedScore: z.number().int().optional(),
            cap: z
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
                cap: z.number().int().gte(1).lte(5),
                reason: z.enum([
                  'insufficient_evidence',
                  'evidence_expired',
                  'open_findings',
                  'attestation_stale',
                  'never_exercised',
                ]),
                contributingFindingIds: z.array(z.string()),
              })
              .partial()
              .passthrough(),
            evidenceBackedShare: z.number().optional(),
            validEvidenceIds: z.array(z.string()).optional(),
            lapsedEvidenceIds: z.array(z.string()).optional(),
            narrative: z.string().optional(),
            computedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 404,
        description: `Resource not found`,
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
    path: '/v1/domains/scores',
    alias: 'listDomainScores',
    description: `Scores across risk exposure, governance and leadership, strategic context, resilience, response capability, extended ecosystem, and efficient investment. Each score is ceilinged by valid evidence and open findings.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'asOf',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
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
                  score: z.number().int().gte(1).lte(5),
                  claimedScore: z.number().int().optional(),
                  cap: z
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
                      cap: z.number().int().gte(1).lte(5),
                      reason: z.enum([
                        'insufficient_evidence',
                        'evidence_expired',
                        'open_findings',
                        'attestation_stale',
                        'never_exercised',
                      ]),
                      contributingFindingIds: z.array(z.string()),
                    })
                    .partial()
                    .passthrough(),
                  evidenceBackedShare: z.number().optional(),
                  validEvidenceIds: z.array(z.string()).optional(),
                  lapsedEvidenceIds: z.array(z.string()).optional(),
                  narrative: z.string().optional(),
                  computedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios('https://api.vouchstone.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
