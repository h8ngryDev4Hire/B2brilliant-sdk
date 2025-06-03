"use strict";
/**
 * API Client for making HTTP requests to the B2B Campaign Agent API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const errors_1 = require("./errors");
class ApiClient {
    /**
     * Create a new API client
     *
     * @param config - Configuration options
     */
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl;
    }
    /**
     * Make a POST request to the API
     *
     * @param endpoint - API endpoint
     * @param data - Request body
     * @returns Response data
     */
    async post(endpoint, data = {}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        return this._fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    /**
     * Make a fetch request with error handling
     *
     * @private
     * @param url - Request URL
     * @param options - Fetch options
     * @returns Response data
     */
    async _fetch(url, options) {
        const fetchOptions = {
            ...options,
            headers: {
                'x-api-key': this.apiKey,
                'Accept-Encoding': 'deflate',
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        };
        try {
            const response = await fetch(url.toString(), fetchOptions);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new errors_1.ApiError(errorData.message || `HTTP error ${response.status}`, response.status, errorData);
            }
            return await response.json();
        }
        catch (error) {
            if (error instanceof errors_1.ApiError) {
                throw error;
            }
            const err = error;
            throw new errors_1.ApiError(err.message || 'Network error', 0, { originalError: error });
        }
    }
}
exports.ApiClient = ApiClient;
