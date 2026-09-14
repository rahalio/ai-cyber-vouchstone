/**
 * Attribution Domain Facade
 *
 * High-level API for attribution domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { attributionService } from "./attribution.service";
// TODO: Import types
// import type { ... } from "./attribution.api-types";

/**
 * Attribution Facade
 *
 * High-level API for attribution operations.
 * Components should use this facade instead of services directly.
 */
export const attributionFacade = {
  /**
   * Records who discovered a confirmed successful attack. Captured at intake by the incident process,...
   */
  async getAttribution(...args: Parameters<typeof attributionService.getAttribution>): Promise<any> {
    return attributionService.getAttribution(...args);
  },
  /**
   * Standing metric of what share of confirmed successful attacks the security function discovered it...
   */
  async getDiscoveryShare(...args: Parameters<typeof attributionService.getDiscoveryShare>): Promise<any> {
    return attributionService.getDiscoveryShare(...args);
  },
  /**
   * Measured time to detect as a distribution, never a surveyed estimate or a single average.
   */
  async getDetectionInterval(...args: Parameters<typeof attributionService.getDetectionInterval>): Promise<any> {
    return attributionService.getDetectionInterval(...args);
  }
};
