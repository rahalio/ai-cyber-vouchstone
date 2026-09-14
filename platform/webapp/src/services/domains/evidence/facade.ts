/**
 * Evidence Domain Facade
 *
 * High-level API for evidence domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { evidenceService } from "./evidence.service";
// TODO: Import types
// import type { ... } from "./evidence.api-types";

/**
 * Evidence Facade
 *
 * High-level API for evidence operations.
 * Components should use this facade instead of services directly.
 */
export const evidenceFacade = {
  /**
   * List Evidence Items
   */
  async getEvidence(...args: Parameters<typeof evidenceService.getEvidence>): Promise<any> {
    return evidenceService.getEvidence(...args);
  },
  /**
   * Submit typed evidence. The validity period is derived from the committee-owned rule for the evide...
   */
  async createEvidence(...args: Parameters<typeof evidenceService.createEvidence>): Promise<any> {
    return evidenceService.createEvidence(...args);
  },
  /**
   * Forward view of evidence lapsing in the requested horizon and the score impact of each lapse.
   */
  async getExpiryForecast(...args: Parameters<typeof evidenceService.getExpiryForecast>): Promise<any> {
    return evidenceService.getExpiryForecast(...args);
  }
};
