/**
 * API endpoints for the B2B Campaign Agent
 */

// User endpoints
export const USER_ENDPOINTS = {
  DISCOVER: '/api/v1/user/discover',
  REFINE: '/api/v1/user/refine'
} as const;

// Business endpoints
export const BUSINESS_ENDPOINTS = {
  DISCOVER: '/api/v1/business/discover',
  REFINE: '/api/v1/business/refine',
  COMPATIBILITY: '/api/v1/business/compatibility'
} as const;

// Campaign endpoints
export const CAMPAIGN_ENDPOINTS = {
  CREATE: '/api/v1/campaigns/create',
  REFINE: '/api/v1/campaigns/refine'
} as const;
