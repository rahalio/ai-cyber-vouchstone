/**
 * Allocation Domain Contracts
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
 * @see @vouchstone/core/allocation for the source schemas
 */

import { allocationSchemas as coreAllocationSchemas } from "@vouchstone/core/allocation";
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
} = coreAllocationSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const allocationSchemas = coreAllocationSchemas;
