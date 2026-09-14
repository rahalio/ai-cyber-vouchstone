/**
 * Governance Mutation Hooks
 *
 * React Query hooks for mutating governance data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { governanceService } from "../governance.service";
// TODO: Import types
// import type { ... } from "../governance.api-types";

/**
 * Hook to requires the committee scope. the scored security function cannot alter the mechanism by which it...
 *
 * Automatically invalidates governance queries on success.
 */
export function useUpdateSetting() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return governanceService.updateSetting(data);
    },
    {
      invalidateQueries: [["governance", "Setting"]],
    }
  );
}
