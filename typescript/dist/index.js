"use strict";
/**
 * B2B Campaign Agent TypeScript SDK
 *
 * A TypeScript client for the B2B Campaign Agent API.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = exports.B2BrilliantAgent = void 0;
const apiClient_1 = require("./apiClient");
const endpoints_1 = require("./endpoints");
/**
 * Main SDK Agent class that provides access to all B2B Campaign Agent APIs
 */
class B2BrilliantAgent {
    /**
     * Create a new B2B Campaign Agent client
     *
     * @param config - Configuration options
     */
    constructor(config) {
        if (!config.apiKey) {
            throw new Error('API key is required');
        }
        this.apiClient = new apiClient_1.ApiClient({
            apiKey: config.apiKey,
            baseUrl: config.baseUrl || 'https://api.b2brilliant.app',
        });
        // Initialize user namespace
        this.user = {
            discover: (urls, options = {}) => {
                return this.apiClient.post(endpoints_1.USER_ENDPOINTS.DISCOVER, { urls, options });
            },
            refine: (business, feedback) => {
                return this.apiClient.post(endpoints_1.USER_ENDPOINTS.REFINE, { business, feedback });
            }
        };
        // Initialize business namespace
        this.business = {
            discover: (urls, options = {}) => {
                return this.apiClient.post(endpoints_1.BUSINESS_ENDPOINTS.DISCOVER, { urls, options });
            },
            refine: (business, feedback) => {
                return this.apiClient.post(endpoints_1.BUSINESS_ENDPOINTS.REFINE, { business, feedback });
            },
            compatibility: (userBusiness, targetBusiness) => {
                return this.apiClient.post(endpoints_1.BUSINESS_ENDPOINTS.COMPATIBILITY, { userBusiness, targetBusiness });
            }
        };
        // Initialize campaigns namespace
        this.campaigns = {
            create: (userBusiness, targetBusiness, campaignTypes = ['dm', 'email', 'sms']) => {
                return this.apiClient.post(endpoints_1.CAMPAIGN_ENDPOINTS.CREATE, { userBusiness, targetBusiness, campaignTypes });
            },
            refine: (userBusiness, targetBusiness, campaign, feedback) => {
                return this.apiClient.post(endpoints_1.CAMPAIGN_ENDPOINTS.REFINE, { userBusiness, targetBusiness, campaign, feedback });
            }
        };
    }
}
exports.B2BrilliantAgent = B2BrilliantAgent;
// Export everything
__exportStar(require("./types"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./endpoints"), exports);
var apiClient_2 = require("./apiClient");
Object.defineProperty(exports, "ApiClient", { enumerable: true, get: function () { return apiClient_2.ApiClient; } });
// Default export
exports.default = B2BrilliantAgent;
