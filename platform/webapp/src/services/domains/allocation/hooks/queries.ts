/**
 * Allocation Query Hooks
 *
 * React Query hooks for fetching allocation data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { allocationService } from "../allocation.service";

/**
 * Hook to compares where the organisation believes impact concentrates against where control effort and spe...
 *
 * Query key: ["allocation", "Reconciliation", ]
 */
export function useReconciliation(params?: Record<string, any>) {
  return useTenantQuery(
    ["allocation", "Reconciliation", ],
    async (orgId: string, signal?: AbortSignal) => {
      return allocationService.getReconciliation(params, signal);
    }
  );
}
