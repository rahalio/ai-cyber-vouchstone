/**
 * Exercises Mutation Hooks
 *
 * React Query hooks for mutating exercises data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { exercisesService } from "../exercises.service";
// TODO: Import types
// import type { ... } from "../exercises.api-types";

/**
 * Hook to schedule an independent adversary emulation with a defined scope over named priority assets. a mi...
 *
 * Automatically invalidates exercises queries on success.
 */
export function useGetExercise() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return exercisesService.getExercise(data);
    },
    {
      invalidateQueries: [["exercises", "Exercise"]],
    }
  );
}

/**
 * Hook to record exercise outcome
 *
 * Automatically invalidates exercises queries on success.
 */
export function useGetOutcome() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return exercisesService.getOutcome(data);
    },
    {
      invalidateQueries: [["exercises", "Outcome"]],
    }
  );
}
