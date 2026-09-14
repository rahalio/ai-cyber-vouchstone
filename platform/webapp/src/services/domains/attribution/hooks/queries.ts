/**
 * Attribution Query Hooks
 *
 * React Query hooks for fetching attribution data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { attributionService } from "../attribution.service";

/**
 * Hook to standing metric of what share of confirmed successful attacks the security function discovered it...
 *
 * Query key: ["attribution", "DiscoveryShare", ]
 */
export function useDiscoveryShare(params?: Record<string, any>) {
  return useTenantQuery(
    ["attribution", "DiscoveryShare", ],
    async (orgId: string, signal?: AbortSignal) => {
      return attributionService.getDiscoveryShare(params, signal);
    }
  );
}

/**
 * Hook to measured time to detect as a distribution, never a surveyed estimate or a single average.
 *
 * Query key: ["attribution", "DetectionInterval", ]
 */
export function useDetectionInterval(params?: Record<string, any>) {
  return useTenantQuery(
    ["attribution", "DetectionInterval", ],
    async (orgId: string, signal?: AbortSignal) => {
      return attributionService.getDetectionInterval(params, signal);
    }
  );
}
