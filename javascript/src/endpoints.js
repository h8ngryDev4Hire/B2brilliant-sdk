/**
 * API endpoints for the B2B Campaign Agent
 */

// User endpoints
const USER_ENDPOINTS = {
  DISCOVER: '/api/user/discover',
  REFINE: '/api/user/refine'
};

// Business endpoints
const BUSINESS_ENDPOINTS = {
  DISCOVER: '/api/business/discover',
  REFINE: '/api/business/refine',
  COMPATIBILITY: '/api/business/compatibility'
};

// Campaign endpoints
const CAMPAIGN_ENDPOINTS = {
  CREATE: '/api/campaigns/create',
  REFINE: '/api/campaigns/refine'
};

module.exports = {
  USER_ENDPOINTS,
  BUSINESS_ENDPOINTS,
  CAMPAIGN_ENDPOINTS
}; 