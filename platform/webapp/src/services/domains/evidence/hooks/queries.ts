/**
 * Evidence Query Hooks
 *
 * React Query hooks for fetching evidence data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { evidenceService } from "../evidence.service";

/**
 * Hook to list evidence items
 *
 * Query key: ["evidence", "Evidence", ]
 */
export function useEvidence(params?: Record<string, any>) {
  return useTenantQuery(
    ["evidence", "Evidence", ],
    async (orgId: string, signal?: AbortSignal) => {
      return evidenceService.getEvidence(params, signal);
    }
  );
}

/**
 * Hook to forward view of evidence lapsing in the requested horizon and the score impact of each lapse.
 *
 * Query key: ["evidence", "ExpiryForecast", ]
 */
export function useExpiryForecast(params?: Record<string, any>) {
  return useTenantQuery(
    ["evidence", "ExpiryForecast", ],
    async (orgId: string, signal?: AbortSignal) => {
      return evidenceService.getExpiryForecast(params, signal);
    }
  );
}
