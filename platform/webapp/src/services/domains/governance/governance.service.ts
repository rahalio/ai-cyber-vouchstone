/**
 * Governance Service
 *
 * API client for governance domain.
 * Uses ApiResponse<T> pattern - response.data is already T.
 *
 * TODO(client): Migrate all endpoints to typed client when generated.
 * Currently using apiClient.get/post() as temporary fallback.
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { getEffectiveOrgId } from "@/services/shared/infrastructure/tenant-state";
import { validateApiResponse, formatValidationError } from "@/services/shared/contracts";
// TODO: Import schemas from contracts
// import { ... } from "./contracts";
// TODO: Import types from api-types
// import type { ... } from "./governance.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawGovernanceService = {
  /**
   * Get Governance Settings
   */
  async getSetting(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/governance/settings` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },
  /**
   * Requires the committee scope. The scored security function cannot alter the mechanism by which it...
   */
  async updateSetting(data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/governance/settings`;

    // TODO(client): migrate when generated
    const response = await apiClient.put<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },
  /**
   * Reads of the asset register, coverage gaps, and exercise findings are recorded and reviewable.
   */
  async getAccessLog(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/governance/access-log` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }
};

// Wrap service with error handling and logging
export const governanceService = makeService(rawGovernanceService, "governance");
