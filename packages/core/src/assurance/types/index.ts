/**
 * Assurance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/assurance.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssuranceStatement = components["schemas"]["AssuranceStatement"];
export type AssuranceStatementCreate = components["schemas"]["AssuranceStatementCreate"];
export type ContractualClause = components["schemas"]["ContractualClause"];
export type DiscoveryShareReport = components["schemas"]["DiscoveryShareReport"];
export type ExportPackage = components["schemas"]["ExportPackage"];
export type StatementClaim = components["schemas"]["StatementClaim"];
export type ThirdPartyAssessment = components["schemas"]["ThirdPartyAssessment"];
export type Statement = operations["listAssuranceStatements"]["responses"]["200"]["content"]["application/json"]["data"];
export type Export = operations["exportAssurancePackage"]["responses"]["201"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SignAssuranceStatementRequestInput = NonNullable<operations["signAssuranceStatement"]["requestBody"]>["content"]["application/json"];
export type ExportAssurancePackageRequestInput = NonNullable<operations["exportAssurancePackage"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAssuranceStatementsParams = NonNullable<operations["listAssuranceStatements"]["parameters"]["query"]>;
export type ExportAssurancePackageParams = operations["exportAssurancePackage"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAssuranceStatementsResponse = operations["listAssuranceStatements"]["responses"]["200"]["content"]["application/json"];
export type SignAssuranceStatementResponse = operations["signAssuranceStatement"]["responses"]["201"]["content"]["application/json"];
export type ExportAssurancePackageResponse = operations["exportAssurancePackage"]["responses"]["201"]["content"]["application/json"];


