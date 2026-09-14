import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const attributeIncidentDiscovery_Body = z
  .object({
    discovererClass: z.enum([
      'security_function',
      'other_employee',
      'authority_or_regulator',
      'external_researcher',
      'supplier',
      'customer',
      'unknown',
    ]),
    discoveredAt: z.string().datetime({ offset: true }),
    estimatedCompromiseAt: z.string().datetime({ offset: true }),
    detectionSource: z.string().optional(),
    recordedBy: z.string().optional(),
  })
  .passthrough();
const DiscovererAttributionCreate = z
  .object({
    discovererClass: z.enum([
      'security_function',
      'other_employee',
      'authority_or_regulator',
      'external_researcher',
      'supplier',
      'customer',
      'unknown',
    ]),
    discoveredAt: z.string().datetime({ offset: true }),
    estimatedCompromiseAt: z.string().datetime({ offset: true }),
    detectionSource: z.string().optional(),
    recordedBy: z.string().optional(),
  })
  .passthrough();
const Incident = z
  .object({
    id: z.string(),
    confirmedAt: z.string().datetime({ offset: true }),
    severity: z.enum(['low', 'moderate', 'major', 'critical']),
    targeted: z.boolean().optional(),
    objectiveAchievedByAttacker: z.boolean().optional(),
    affectedAssetIds: z.array(z.string()).optional(),
    threatClass: z
      .enum([
        'insider',
        'external_targeted',
        'external_opportunistic',
        'supply_chain',
        'unknown',
      ])
      .optional(),
  })
  .passthrough();
const DetectionInterval = z
  .object({
    incidentId: z.string(),
    estimatedCompromiseAt: z.string().datetime({ offset: true }),
    discoveredAt: z.string().datetime({ offset: true }),
    days: z.number().int(),
    band: z.enum(['hours', 'days', 'weeks', 'months', 'year_or_more']),
    measured: z.boolean().default(true),
  })
  .partial()
  .passthrough();
const DiscovererAttribution = z
  .object({
    id: z.string(),
    incidentId: z.string(),
    discovererClass: z.enum([
      'security_function',
      'other_employee',
      'authority_or_regulator',
      'external_researcher',
      'supplier',
      'customer',
      'unknown',
    ]),
    discoveredAt: z.string().datetime({ offset: true }),
    incident: z
      .object({
        id: z.string(),
        confirmedAt: z.string().datetime({ offset: true }),
        severity: z.enum(['low', 'moderate', 'major', 'critical']),
        targeted: z.boolean().optional(),
        objectiveAchievedByAttacker: z.boolean().optional(),
        affectedAssetIds: z.array(z.string()).optional(),
        threatClass: z
          .enum([
            'insider',
            'external_targeted',
            'external_opportunistic',
            'supply_chain',
            'unknown',
          ])
          .optional(),
      })
      .passthrough()
      .optional(),
    detectionInterval: z
      .object({
        incidentId: z.string(),
        estimatedCompromiseAt: z.string().datetime({ offset: true }),
        discoveredAt: z.string().datetime({ offset: true }),
        days: z.number().int(),
        band: z.enum(['hours', 'days', 'weeks', 'months', 'year_or_more']),
        measured: z.boolean().default(true),
      })
      .partial()
      .passthrough()
      .optional(),
    recordedBy: z.string().optional(),
    appendOnly: z.boolean().optional().default(true),
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
const DataEnvelopeDiscovererAttribution = z
  .object({
    data: z
      .object({
        id: z.string(),
        incidentId: z.string(),
        discovererClass: z.enum([
          'security_function',
          'other_employee',
          'authority_or_regulator',
          'external_researcher',
          'supplier',
          'customer',
          'unknown',
        ]),
        discoveredAt: z.string().datetime({ offset: true }),
        incident: z
          .object({
            id: z.string(),
            confirmedAt: z.string().datetime({ offset: true }),
            severity: z.enum(['low', 'moderate', 'major', 'critical']),
            targeted: z.boolean().optional(),
            objectiveAchievedByAttacker: z.boolean().optional(),
            affectedAssetIds: z.array(z.string()).optional(),
            threatClass: z
              .enum([
                'insider',
                'external_targeted',
                'external_opportunistic',
                'supply_chain',
                'unknown',
              ])
              .optional(),
          })
          .passthrough()
          .optional(),
        detectionInterval: z
          .object({
            incidentId: z.string(),
            estimatedCompromiseAt: z.string().datetime({ offset: true }),
            discoveredAt: z.string().datetime({ offset: true }),
            days: z.number().int(),
            band: z.enum(['hours', 'days', 'weeks', 'months', 'year_or_more']),
            measured: z.boolean().default(true),
          })
          .partial()
          .passthrough()
          .optional(),
        recordedBy: z.string().optional(),
        appendOnly: z.boolean().optional().default(true),
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
const DataEnvelopeDiscoveryShareReport = z
  .object({
    data: z
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
const DetectionIntervalDistribution = z
  .object({
    period: z.string(),
    sampleSize: z.number().int(),
    medianDays: z.number(),
    ninetiethPercentileDays: z.number(),
    byBand: z.array(
      z
        .object({
          band: z.enum(['hours', 'days', 'weeks', 'months', 'year_or_more']),
          count: z.number().int(),
          share: z.number(),
        })
        .partial()
        .passthrough()
    ),
    estimatesExcluded: z.boolean().default(true),
  })
  .partial()
  .passthrough();
const DataEnvelopeDetectionIntervalDistribution = z
  .object({
    data: z
      .object({
        period: z.string(),
        sampleSize: z.number().int(),
        medianDays: z.number(),
        ninetiethPercentileDays: z.number(),
        byBand: z.array(
          z
            .object({
              band: z.enum([
                'hours',
                'days',
                'weeks',
                'months',
                'year_or_more',
              ]),
              count: z.number().int(),
              share: z.number(),
            })
            .partial()
            .passthrough()
        ),
        estimatesExcluded: z.boolean().default(true),
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

export const schemas: any = {
  attributeIncidentDiscovery_Body,
  DiscovererAttributionCreate,
  Incident,
  DetectionInterval,
  DiscovererAttribution,
  ResponseMeta,
  DataEnvelopeDiscovererAttribution,
  Problem,
  DiscoveryShareReport,
  DataEnvelopeDiscoveryShareReport,
  DetectionIntervalDistribution,
  DataEnvelopeDetectionIntervalDistribution,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/attribution/detection-intervals',
    alias: 'getDetectionIntervalDistribution',
    description: `Measured time to detect as a distribution, never a surveyed estimate or a single average.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            period: z.string(),
            sampleSize: z.number().int(),
            medianDays: z.number(),
            ninetiethPercentileDays: z.number(),
            byBand: z.array(
              z
                .object({
                  band: z.enum([
                    'hours',
                    'days',
                    'weeks',
                    'months',
                    'year_or_more',
                  ]),
                  count: z.number().int(),
                  share: z.number(),
                })
                .partial()
                .passthrough()
            ),
            estimatesExcluded: z.boolean().default(true),
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
    method: 'get',
    path: '/v1/attribution/discovery-share',
    alias: 'getDiscoveryShareReport',
    description: `Standing metric of what share of confirmed successful attacks the security function discovered itself, with the remainder broken out by discoverer class.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
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
    path: '/v1/incidents/:incidentId/attribution',
    alias: 'attributeIncidentDiscovery',
    description: `Records who discovered a confirmed successful attack. Captured at intake by the incident process, outside the control of the function whose share it measures.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: attributeIncidentDiscovery_Body,
      },
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            incidentId: z.string(),
            discovererClass: z.enum([
              'security_function',
              'other_employee',
              'authority_or_regulator',
              'external_researcher',
              'supplier',
              'customer',
              'unknown',
            ]),
            discoveredAt: z.string().datetime({ offset: true }),
            incident: z
              .object({
                id: z.string(),
                confirmedAt: z.string().datetime({ offset: true }),
                severity: z.enum(['low', 'moderate', 'major', 'critical']),
                targeted: z.boolean().optional(),
                objectiveAchievedByAttacker: z.boolean().optional(),
                affectedAssetIds: z.array(z.string()).optional(),
                threatClass: z
                  .enum([
                    'insider',
                    'external_targeted',
                    'external_opportunistic',
                    'supply_chain',
                    'unknown',
                  ])
                  .optional(),
              })
              .passthrough()
              .optional(),
            detectionInterval: z
              .object({
                incidentId: z.string(),
                estimatedCompromiseAt: z.string().datetime({ offset: true }),
                discoveredAt: z.string().datetime({ offset: true }),
                days: z.number().int(),
                band: z.enum([
                  'hours',
                  'days',
                  'weeks',
                  'months',
                  'year_or_more',
                ]),
                measured: z.boolean().default(true),
              })
              .partial()
              .passthrough()
              .optional(),
            recordedBy: z.string().optional(),
            appendOnly: z.boolean().optional().default(true),
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
]);

export const api: any = new Zodios('https://api.vouchstone.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
