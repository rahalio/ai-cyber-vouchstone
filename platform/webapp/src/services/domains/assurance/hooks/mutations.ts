/**
 * Assurance Mutation Hooks
 *
 * React Query hooks for mutating assurance data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { assuranceService } from "../assurance.service";
// TODO: Import types
// import type { ... } from "../assurance.api-types";

/**
 * Hook to signs and freezes the statement together with the exact evidence validity state at the moment of ...
 *
 * Automatically invalidates assurance queries on success.
 */
export function useGetStatement() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assuranceService.getStatement(data);
    },
    {
      invalidateQueries: [["assurance", "Statement"]],
    }
  );
}

/**
 * Hook to generates the committee pack, regulatory return, or insurance proposal response from the one froz...
 *
 * Automatically invalidates assurance queries on success.
 */
export function useListExport() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assuranceService.getExport(data);
    },
    {
      invalidateQueries: [["assurance", "Export"]],
    }
  );
}
