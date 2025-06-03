/**
 * API endpoints for the B2B Campaign Agent
 */

// User endpoints
export const USER_ENDPOINTS = {
  DISCOVER: '/api/user/discover',
  REFINE: '/api/user/refine'
} as const;

// Business endpoints
export const BUSINESS_ENDPOINTS = {
  DISCOVER: '/api/business/discover',
  REFINE: '/api/business/refine',
  COMPATIBILITY: '/api/business/compatibility'
} as const;

// Campaign endpoints
export const CAMPAIGN_ENDPOINTS = {
  CREATE: '/api/campaigns/create',
  REFINE: '/api/campaigns/refine'
} as const;
