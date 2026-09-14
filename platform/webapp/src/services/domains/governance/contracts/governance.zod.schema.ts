/**
 * Governance Domain Contracts
 *
 * Re-exports Zod schemas from @vouchstone/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @vouchstone/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @vouchstone/core/governance for the source schemas
 */

import { governanceSchemas as coreGovernanceSchemas } from "@vouchstone/core/governance";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreGovernanceSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const governanceSchemas = coreGovernanceSchemas;
