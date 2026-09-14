/**
 * Findings Query Hooks
 *
 * React Query hooks for fetching findings data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { findingsService } from "../findings.service";

/**
 * Hook to list findings
 *
 * Query key: ["findings", "Finding", ]
 */
export function useFinding(params?: Record<string, any>) {
  return useTenantQuery(
    ["findings", "Finding", ],
    async (orgId: string, signal?: AbortSignal) => {
      return findingsService.getFinding(params, signal);
    }
  );
}
