import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerPriorityAsset_Body = z
  .object({
    name: z.string(),
    businessCriticality: z.enum(['low', 'medium', 'high', 'crown_jewel']),
    ownerId: z.string(),
    businessUnit: z.string().optional(),
    location: z.string().optional(),
    adversaryObjective: z.string().optional(),
    reattestationIntervalDays: z.number().int().optional(),
  })
  .passthrough();
const attestPriorityAsset_Body = z
  .object({
    locationConfirmed: z.boolean(),
    attestedBy: z.string(),
    locationCorrection: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const PriorityAsset = z
  .object({
    id: z.string(),
    name: z.string(),
    businessCriticality: z.enum(['low', 'medium', 'high', 'crown_jewel']),
    ownerId: z.string(),
    businessUnit: z.string().optional(),
    location: z.string().optional(),
    adversaryObjective: z.string().optional(),
    attestationState: z
      .enum(['current', 'due', 'stale', 'never_attested'])
      .optional(),
    reattestationIntervalDays: z.number().int().optional(),
    lastAttestedAt: z.string().datetime({ offset: true }).optional(),
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
const ListEnvelopePriorityAsset = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              businessCriticality: z.enum([
                'low',
                'medium',
                'high',
                'crown_jewel',
              ]),
              ownerId: z.string(),
              businessUnit: z.string().optional(),
              location: z.string().optional(),
              adversaryObjective: z.string().optional(),
              attestationState: z
                .enum(['current', 'due', 'stale', 'never_attested'])
                .optional(),
              reattestationIntervalDays: z.number().int().optional(),
              lastAttestedAt: z.string().datetime({ offset: true }).optional(),
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
const PriorityAssetCreate = z
  .object({
    name: z.string(),
    businessCriticality: z.enum(['low', 'medium', 'high', 'crown_jewel']),
    ownerId: z.string(),
    businessUnit: z.string().optional(),
    location: z.string().optional(),
    adversaryObjective: z.string().optional(),
    reattestationIntervalDays: z.number().int().optional(),
  })
  .passthrough();
const DataEnvelopePriorityAsset = z
  .object({
    data: z
      .object({
        id: z.string(),
        name: z.string(),
        businessCriticality: z.enum(['low', 'medium', 'high', 'crown_jewel']),
        ownerId: z.string(),
        businessUnit: z.string().optional(),
        location: z.string().optional(),
        adversaryObjective: z.string().optional(),
        attestationState: z
          .enum(['current', 'due', 'stale', 'never_attested'])
          .optional(),
        reattestationIntervalDays: z.number().int().optional(),
        lastAttestedAt: z.string().datetime({ offset: true }).optional(),
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
const AssetAttestationCreate = z
  .object({
    locationConfirmed: z.boolean(),
    attestedBy: z.string(),
    locationCorrection: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const AssetAttestation = z
  .object({
    id: z.string(),
    assetId: z.string(),
    attestedBy: z.string(),
    attestedAt: z.string().datetime({ offset: true }),
    locationConfirmed: z.boolean().optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopeAssetAttestation = z
  .object({
    data: z
      .object({
        id: z.string(),
        assetId: z.string(),
        attestedBy: z.string(),
        attestedAt: z.string().datetime({ offset: true }),
        locationConfirmed: z.boolean().optional(),
        expiresAt: z.string().datetime({ offset: true }).optional(),
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
  registerPriorityAsset_Body,
  attestPriorityAsset_Body,
  PriorityAsset,
  ResponseMeta,
  ListEnvelopePriorityAsset,
  Problem,
  PriorityAssetCreate,
  DataEnvelopePriorityAsset,
  AssetAttestationCreate,
  AssetAttestation,
  DataEnvelopeAssetAttestation,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/assets',
    alias: 'listPriorityAssets',
    description: `Compartmented. Callers see only assets within their attestation or role scope.`,
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
      {
        name: 'attestationState',
        type: 'Query',
        schema: z
          .enum(['current', 'due', 'stale', 'never_attested'])
          .optional(),
      },
      {
        name: 'businessCriticality',
        type: 'Query',
        schema: z.enum(['low', 'medium', 'high', 'crown_jewel']).optional(),
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
                  name: z.string(),
                  businessCriticality: z.enum([
                    'low',
                    'medium',
                    'high',
                    'crown_jewel',
                  ]),
                  ownerId: z.string(),
                  businessUnit: z.string().optional(),
                  location: z.string().optional(),
                  adversaryObjective: z.string().optional(),
                  attestationState: z
                    .enum(['current', 'due', 'stale', 'never_attested'])
                    .optional(),
                  reattestationIntervalDays: z.number().int().optional(),
                  lastAttestedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
  {
    method: 'post',
    path: '/v1/assets',
    alias: 'registerPriorityAsset',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerPriorityAsset_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            name: z.string(),
            businessCriticality: z.enum([
              'low',
              'medium',
              'high',
              'crown_jewel',
            ]),
            ownerId: z.string(),
            businessUnit: z.string().optional(),
            location: z.string().optional(),
            adversaryObjective: z.string().optional(),
            attestationState: z
              .enum(['current', 'due', 'stale', 'never_attested'])
              .optional(),
            reattestationIntervalDays: z.number().int().optional(),
            lastAttestedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/assets/:assetId/attestation',
    alias: 'attestPriorityAsset',
    description: `Business owner attests to the asset and its recorded location, restarting the re-attestation clock.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: attestPriorityAsset_Body,
      },
      {
        name: 'assetId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            assetId: z.string(),
            attestedBy: z.string(),
            attestedAt: z.string().datetime({ offset: true }),
            locationConfirmed: z.boolean().optional(),
            expiresAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios('https://api.vouchstone.local/v1', endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
