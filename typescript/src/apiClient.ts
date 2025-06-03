/**
 * API Client for making HTTP requests to the B2B Campaign Agent API
 */

import { ApiError } from './errors';
import type { ApiClientConfig } from './types';

export class ApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  /**
   * Create a new API client
   * 
   * @param config - Configuration options
   */
  constructor(config: ApiClientConfig) {
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
  async post<T = any>(endpoint: string, data: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    return this._fetch<T>(url, {
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
  private async _fetch<T>(url: URL, options: RequestInit): Promise<T> {
    const fetchOptions: RequestInit = {
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
        throw new ApiError(
          errorData.message || `HTTP error ${response.status}`,
          response.status,
          errorData
        );
      }
      
      return await response.json() as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      const err = error as Error;
      throw new ApiError(
        err.message || 'Network error',
        0,
        { originalError: error }
      );
    }
  }
}
