/**
 * Assets Domain Facade
 *
 * High-level API for assets domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { assetsService } from "./assets.service";
// TODO: Import types
// import type { ... } from "./assets.api-types";

/**
 * Assets Facade
 *
 * High-level API for assets operations.
 * Components should use this facade instead of services directly.
 */
export const assetsFacade = {
  /**
   * Compartmented. Callers see only assets within their attestation or role scope.
   */
  async getAsset(...args: Parameters<typeof assetsService.getAsset>): Promise<any> {
    return assetsService.getAsset(...args);
  },
  /**
   * Register Priority Asset
   */
  async createAsset(...args: Parameters<typeof assetsService.createAsset>): Promise<any> {
    return assetsService.createAsset(...args);
  },
  /**
   * Business owner attests to the asset and its recorded location, restarting the re-attestation clock.
   */
  async getAttestation(...args: Parameters<typeof assetsService.getAttestation>): Promise<any> {
    return assetsService.getAttestation(...args);
  }
};
