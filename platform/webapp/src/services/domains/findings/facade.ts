/**
 * Findings Domain Facade
 *
 * High-level API for findings domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { findingsService } from "./findings.service";
// TODO: Import types
// import type { ... } from "./findings.api-types";

/**
 * Findings Facade
 *
 * High-level API for findings operations.
 * Components should use this facade instead of services directly.
 */
export const findingsFacade = {
  /**
   * List Findings
   */
  async getFinding(...args: Parameters<typeof findingsService.getFinding>): Promise<any> {
    return findingsService.getFinding(...args);
  },
  /**
   * Raise Finding
   */
  async getFinding(...args: Parameters<typeof findingsService.getFinding>): Promise<any> {
    return findingsService.getFinding(...args);
  },
  /**
   * Update Remediation Commitment
   */
  async updateRemediation(...args: Parameters<typeof findingsService.updateRemediation>): Promise<any> {
    return findingsService.updateRemediation(...args);
  }
};
