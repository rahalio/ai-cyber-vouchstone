/**
 * Domains Mutation Hooks
 *
 * React Query hooks for mutating domains data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { domainsService } from "../domains.service";
// TODO: Import types
// import type { ... } from "../domains.api-types";

/**
 * Hook to propose a posture claim for a domain. rejected when the claim exceeds the evidence cap, including...
 *
 * Automatically invalidates domains queries on success.
 */
export function useGetClaim() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return domainsService.getClaim(data);
    },
    {
      invalidateQueries: [["domains", "Claim"]],
    }
  );
}
