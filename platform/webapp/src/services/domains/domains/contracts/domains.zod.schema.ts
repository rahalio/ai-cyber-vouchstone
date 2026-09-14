/**
 * Domains Domain Contracts
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
 * @see @vouchstone/core/domains for the source schemas
 */

import { domainsSchemas as coreDomainsSchemas } from "@vouchstone/core/domains";
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
} = coreDomainsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const domainsSchemas = coreDomainsSchemas;
