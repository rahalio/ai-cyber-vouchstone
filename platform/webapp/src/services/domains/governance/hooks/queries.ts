/**
 * Governance Query Hooks
 *
 * React Query hooks for fetching governance data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { governanceService } from "../governance.service";

/**
 * Hook to get governance settings
 *
 * Query key: ["governance", "Setting", ]
 */
export function useSetting(params?: Record<string, any>) {
  return useTenantQuery(
    ["governance", "Setting", ],
    async (orgId: string, signal?: AbortSignal) => {
      return governanceService.getSetting(params, signal);
    }
  );
}

/**
 * Hook to reads of the asset register, coverage gaps, and exercise findings are recorded and reviewable.
 *
 * Query key: ["governance", "AccessLog", ]
 */
export function useAccessLog(params?: Record<string, any>) {
  return useTenantQuery(
    ["governance", "AccessLog", ],
    async (orgId: string, signal?: AbortSignal) => {
      return governanceService.getAccessLog(params, signal);
    }
  );
}
