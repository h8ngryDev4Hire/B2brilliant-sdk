/**
 * API Client for making HTTP requests to the B2B Campaign Agent API
 */
import type { ApiClientConfig } from './types';
export declare class ApiClient {
    private readonly apiKey;
    private readonly baseUrl;
    /**
     * Create a new API client
     *
     * @param config - Configuration options
     */
    constructor(config: ApiClientConfig);
    /**
     * Make a POST request to the API
     *
     * @param endpoint - API endpoint
     * @param data - Request body
     * @returns Response data
     */
    post<T = any>(endpoint: string, data?: Record<string, any>): Promise<T>;
    /**
     * Make a fetch request with error handling
     *
     * @private
     * @param url - Request URL
     * @param options - Fetch options
     * @returns Response data
     */
    private _fetch;
}
