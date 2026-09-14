/**
 * Evidence Mutation Hooks
 *
 * React Query hooks for mutating evidence data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { evidenceService } from "../evidence.service";
// TODO: Import types
// import type { ... } from "../evidence.api-types";

/**
 * Hook to submit typed evidence. the validity period is derived from the committee-owned rule for the evide...
 *
 * Automatically invalidates evidence queries on success.
 */
export function useCreateEvidence() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return evidenceService.createEvidence(data);
    },
    {
      invalidateQueries: [["evidence", "Evidence"]],
    }
  );
}
