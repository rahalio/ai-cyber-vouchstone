/**
 * Assets Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/assets.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssetAttestation = components["schemas"]["AssetAttestation"];
export type AssetAttestationCreate = components["schemas"]["AssetAttestationCreate"];
export type PriorityAsset = components["schemas"]["PriorityAsset"];
export type PriorityAssetCreate = components["schemas"]["PriorityAssetCreate"];
export type Asset = operations["listPriorityAssets"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterPriorityAssetRequestInput = NonNullable<operations["registerPriorityAsset"]["requestBody"]>["content"]["application/json"];
export type AttestPriorityAssetRequestInput = NonNullable<operations["attestPriorityAsset"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPriorityAssetsParams = NonNullable<operations["listPriorityAssets"]["parameters"]["query"]>;
export type AttestPriorityAssetParams = operations["attestPriorityAsset"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPriorityAssetsResponse = operations["listPriorityAssets"]["responses"]["200"]["content"]["application/json"];
export type RegisterPriorityAssetResponse = operations["registerPriorityAsset"]["responses"]["201"]["content"]["application/json"];
export type AttestPriorityAssetResponse = operations["attestPriorityAsset"]["responses"]["201"]["content"]["application/json"];


