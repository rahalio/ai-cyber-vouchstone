/**
 * Assurance Query Hooks
 *
 * React Query hooks for fetching assurance data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { assuranceService } from "../assurance.service";

/**
 * Hook to list assurance statements
 *
 * Query key: ["assurance", "Statement", ]
 */
export function useStatement(params?: Record<string, any>) {
  return useTenantQuery(
    ["assurance", "Statement", ],
    async (orgId: string, signal?: AbortSignal) => {
      return assuranceService.getStatement(params, signal);
    }
  );
}
