"use strict";
/**
 * API endpoints for the B2B Campaign Agent
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAMPAIGN_ENDPOINTS = exports.BUSINESS_ENDPOINTS = exports.USER_ENDPOINTS = void 0;
// User endpoints
exports.USER_ENDPOINTS = {
    DISCOVER: '/api/user/discover',
    REFINE: '/api/user/refine'
};
// Business endpoints
exports.BUSINESS_ENDPOINTS = {
    DISCOVER: '/api/business/discover',
    REFINE: '/api/business/refine',
    COMPATIBILITY: '/api/business/compatibility'
};
// Campaign endpoints
exports.CAMPAIGN_ENDPOINTS = {
    CREATE: '/api/campaigns/create',
    REFINE: '/api/campaigns/refine'
};
