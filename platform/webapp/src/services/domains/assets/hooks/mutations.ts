/**
 * Assets Mutation Hooks
 *
 * React Query hooks for mutating assets data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { assetsService } from "../assets.service";
// TODO: Import types
// import type { ... } from "../assets.api-types";

/**
 * Hook to register priority asset
 *
 * Automatically invalidates assets queries on success.
 */
export function useCreateAsset() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assetsService.createAsset(data);
    },
    {
      invalidateQueries: [["assets", "Asset"]],
    }
  );
}

/**
 * Hook to business owner attests to the asset and its recorded location, restarting the re-attestation clock.
 *
 * Automatically invalidates assets queries on success.
 */
export function useGetAttestation() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return assetsService.getAttestation(data);
    },
    {
      invalidateQueries: [["assets", "Attestation"]],
    }
  );
}
