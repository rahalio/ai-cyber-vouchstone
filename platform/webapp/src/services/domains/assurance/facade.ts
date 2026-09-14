/**
 * Assurance Domain Facade
 *
 * High-level API for assurance domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { assuranceService } from "./assurance.service";
// TODO: Import types
// import type { ... } from "./assurance.api-types";

/**
 * Assurance Facade
 *
 * High-level API for assurance operations.
 * Components should use this facade instead of services directly.
 */
export const assuranceFacade = {
  /**
   * List Assurance Statements
   */
  async getStatement(...args: Parameters<typeof assuranceService.getStatement>): Promise<any> {
    return assuranceService.getStatement(...args);
  },
  /**
   * Signs and freezes the statement together with the exact evidence validity state at the moment of ...
   */
  async getStatement(...args: Parameters<typeof assuranceService.getStatement>): Promise<any> {
    return assuranceService.getStatement(...args);
  },
  /**
   * Generates the committee pack, regulatory return, or insurance proposal response from the one froz...
   */
  async getExport(...args: Parameters<typeof assuranceService.getExport>): Promise<any> {
    return assuranceService.getExport(...args);
  }
};
