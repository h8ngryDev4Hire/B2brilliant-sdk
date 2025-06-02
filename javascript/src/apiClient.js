/**
 * API Client for making HTTP requests to the B2B Campaign Agent API
 */

const fetch = require('node-fetch');
const { ApiError } = require('./errors');

class ApiClient {
  /**
   * Create a new API client
   * 
   * @param {Object} config - Configuration options
   * @param {string} config.apiKey - API key for authentication
   * @param {string} config.baseUrl - Base URL for the API
   */
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
  }

  /**
   * Make a POST request to the API
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} [data] - Request body
   * @returns {Promise<Object>} Response data
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
   * @param {URL} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} Response data
   */
  async _fetch(url, options) {
    const fetchOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': this.apiKey,
        ...options.headers
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
      
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        error.message || 'Network error',
        0,
        { originalError: error }
      );
    }
  }
}

module.exports = ApiClient; 