"use strict";
/**
 * API endpoints for the B2B Campaign Agent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAMPAIGN_ENDPOINTS = exports.BUSINESS_ENDPOINTS = exports.USER_ENDPOINTS = void 0;
// User endpoints
exports.USER_ENDPOINTS = {
    DISCOVER: '/api/v1/user/discover',
    REFINE: '/api/v1/user/refine'
};
// Business endpoints
exports.BUSINESS_ENDPOINTS = {
    DISCOVER: '/api/v1/business/discover',
    REFINE: '/api/v1/business/refine',
    COMPATIBILITY: '/api/v1/business/compatibility'
};
// Campaign endpoints
exports.CAMPAIGN_ENDPOINTS = {
    CREATE: '/api/v1/campaigns/create',
    REFINE: '/api/v1/campaigns/refine'
};
