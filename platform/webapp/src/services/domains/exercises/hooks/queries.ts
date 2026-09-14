/**
 * Exercises Query Hooks
 *
 * React Query hooks for fetching exercises data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { exercisesService } from "../exercises.service";

/**
 * Hook to list emulation exercises
 *
 * Query key: ["exercises", "Exercise", ]
 */
export function useExercise(params?: Record<string, any>) {
  return useTenantQuery(
    ["exercises", "Exercise", ],
    async (orgId: string, signal?: AbortSignal) => {
      return exercisesService.getExercise(params, signal);
    }
  );
}
