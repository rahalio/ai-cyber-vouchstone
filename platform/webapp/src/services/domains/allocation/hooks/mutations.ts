/**
 * Allocation Mutation Hooks
 *
 * React Query hooks for mutating allocation data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { allocationService } from "../allocation.service";
// TODO: Import types
// import type { ... } from "../allocation.api-types";

/**
 * Hook to captures the organisation's stated belief about which threat classes carry the greatest impact, f...
 *
 * Automatically invalidates allocation queries on success.
 */
export function useGetImpactBelief() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return allocationService.getImpactBelief(data);
    },
    {
      invalidateQueries: [["allocation", "ImpactBelief"]],
    }
  );
}
