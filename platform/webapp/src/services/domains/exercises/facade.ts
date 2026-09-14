/**
 * Exercises Domain Facade
 *
 * High-level API for exercises domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { exercisesService } from "./exercises.service";
// TODO: Import types
// import type { ... } from "./exercises.api-types";

/**
 * Exercises Facade
 *
 * High-level API for exercises operations.
 * Components should use this facade instead of services directly.
 */
export const exercisesFacade = {
  /**
   * List Emulation Exercises
   */
  async getExercise(...args: Parameters<typeof exercisesService.getExercise>): Promise<any> {
    return exercisesService.getExercise(...args);
  },
  /**
   * Schedule an independent adversary emulation with a defined scope over named priority assets. A mi...
   */
  async getExercise(...args: Parameters<typeof exercisesService.getExercise>): Promise<any> {
    return exercisesService.getExercise(...args);
  },
  /**
   * Record Exercise Outcome
   */
  async getOutcome(...args: Parameters<typeof exercisesService.getOutcome>): Promise<any> {
    return exercisesService.getOutcome(...args);
  }
};
