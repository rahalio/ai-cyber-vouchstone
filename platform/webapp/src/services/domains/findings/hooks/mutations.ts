/**
 * Findings Mutation Hooks
 *
 * React Query hooks for mutating findings data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { findingsService } from "../findings.service";
// TODO: Import types
// import type { ... } from "../findings.api-types";

/**
 * Hook to raise finding
 *
 * Automatically invalidates findings queries on success.
 */
export function useGetFinding() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return findingsService.getFinding(data);
    },
    {
      invalidateQueries: [["findings", "Finding"]],
    }
  );
}

/**
 * Hook to update remediation commitment
 *
 * Automatically invalidates findings queries on success.
 */
export function useUpdateRemediation() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return findingsService.updateRemediation(data);
    },
    {
      invalidateQueries: [["findings", "Remediation"]],
    }
  );
}
