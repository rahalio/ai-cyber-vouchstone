/**
 * Attribution Mutation Hooks
 *
 * React Query hooks for mutating attribution data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { attributionService } from "../attribution.service";
// TODO: Import types
// import type { ... } from "../attribution.api-types";

/**
 * Hook to records who discovered a confirmed successful attack. captured at intake by the incident process,...
 *
 * Automatically invalidates attribution queries on success.
 */
export function useGetAttribution() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return attributionService.getAttribution(data);
    },
    {
      invalidateQueries: [["attribution", "Attribution"]],
    }
  );
}
