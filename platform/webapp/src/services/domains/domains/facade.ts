/**
 * Domains Domain Facade
 *
 * High-level API for domains domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { domainsService } from "./domains.service";
// TODO: Import types
// import type { ... } from "./domains.api-types";

/**
 * Domains Facade
 *
 * High-level API for domains operations.
 * Components should use this facade instead of services directly.
 */
export const domainsFacade = {
  /**
   * Scores across risk exposure, governance and leadership, strategic context, resilience, response c...
   */
  async getScore(...args: Parameters<typeof domainsService.getScore>): Promise<any> {
    return domainsService.getScore(...args);
  },
  /**
   * Get Domain Score
   */
  async getScore(...args: Parameters<typeof domainsService.getScore>): Promise<any> {
    return domainsService.getScore(...args);
  },
  /**
   * Propose a posture claim for a domain. Rejected when the claim exceeds the evidence cap, including...
   */
  async getClaim(...args: Parameters<typeof domainsService.getClaim>): Promise<any> {
    return domainsService.getClaim(...args);
  }
};
