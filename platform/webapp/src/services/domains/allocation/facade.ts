/**
 * Allocation Domain Facade
 *
 * High-level API for allocation domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { allocationService } from "./allocation.service";
// TODO: Import types
// import type { ... } from "./allocation.api-types";

/**
 * Allocation Facade
 *
 * High-level API for allocation operations.
 * Components should use this facade instead of services directly.
 */
export const allocationFacade = {
  /**
   * Compares where the organisation believes impact concentrates against where control effort and spe...
   */
  async getReconciliation(...args: Parameters<typeof allocationService.getReconciliation>): Promise<any> {
    return allocationService.getReconciliation(...args);
  },
  /**
   * Captures the organisation's stated belief about which threat classes carry the greatest impact, f...
   */
  async getImpactBelief(...args: Parameters<typeof allocationService.getImpactBelief>): Promise<any> {
    return allocationService.getImpactBelief(...args);
  }
};
