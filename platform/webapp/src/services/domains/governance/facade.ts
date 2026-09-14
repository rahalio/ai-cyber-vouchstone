/**
 * Governance Domain Facade
 *
 * High-level API for governance domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { governanceService } from "./governance.service";
// TODO: Import types
// import type { ... } from "./governance.api-types";

/**
 * Governance Facade
 *
 * High-level API for governance operations.
 * Components should use this facade instead of services directly.
 */
export const governanceFacade = {
  /**
   * Get Governance Settings
   */
  async getSetting(...args: Parameters<typeof governanceService.getSetting>): Promise<any> {
    return governanceService.getSetting(...args);
  },
  /**
   * Requires the committee scope. The scored security function cannot alter the mechanism by which it...
   */
  async updateSetting(...args: Parameters<typeof governanceService.updateSetting>): Promise<any> {
    return governanceService.updateSetting(...args);
  },
  /**
   * Reads of the asset register, coverage gaps, and exercise findings are recorded and reviewable.
   */
  async getAccessLog(...args: Parameters<typeof governanceService.getAccessLog>): Promise<any> {
    return governanceService.getAccessLog(...args);
  }
};
