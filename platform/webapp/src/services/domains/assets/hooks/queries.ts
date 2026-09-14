/**
 * Assets Query Hooks
 *
 * React Query hooks for fetching assets data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { assetsService } from "../assets.service";

/**
 * Hook to compartmented. callers see only assets within their attestation or role scope.
 *
 * Query key: ["assets", "Asset", ]
 */
export function useAsset(params?: Record<string, any>) {
  return useTenantQuery(
    ["assets", "Asset", ],
    async (orgId: string, signal?: AbortSignal) => {
      return assetsService.getAsset(params, signal);
    }
  );
}
