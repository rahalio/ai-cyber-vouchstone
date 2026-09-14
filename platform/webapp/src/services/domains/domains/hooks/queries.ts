/**
 * Domains Query Hooks
 *
 * React Query hooks for fetching domains data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { domainsService } from "../domains.service";

/**
 * Hook to scores across risk exposure, governance and leadership, strategic context, resilience, response c...
 *
 * Query key: ["domains", "Score", ]
 */
export function useScore(params?: Record<string, any>) {
  return useTenantQuery(
    ["domains", "Score", ],
    async (orgId: string, signal?: AbortSignal) => {
      return domainsService.getScore(params, signal);
    }
  );
}

/**
 * Hook to get domain score
 *
 * Query key: ["domains", "Score", domainKey]
 */
export function useScore(domainKey: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["domains", "Score", domainKey],
    async (orgId: string, signal?: AbortSignal) => {
      return domainsService.getScore(domainKey, params, signal);
    },
    {
      enabled: !!domainKey
    }
  );
}
