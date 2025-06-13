/**
 * Tests for ApiClient in the B2B Campaign Agent SDK
 */

import { ApiClient } from './apiClient';
import { ApiError } from './errors';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const mockConfig = {
    apiKey: 'test-api-key',
    baseUrl: 'https://api.test.com'
  };

  beforeEach(() => {
    apiClient = new ApiClient(mockConfig);
    mockFetch.mockClear();
  });

  describe('constructor', () => {
    it('should create ApiClient with provided config', () => {
      expect(apiClient).toBeInstanceOf(ApiClient);
      // Test that the config is stored (even though properties are private)
      expect(apiClient).toBeDefined();
    });
  });

  describe('post method', () => {
    it('should make successful POST request', async () => {
      const mockResponse = { success: true, data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await apiClient.post('/test-endpoint', { test: 'data' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test-endpoint',
        {
          method: 'POST',
          headers: {
            'x-api-key': 'test-api-key',
            'Accept-Encoding': 'deflate',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ test: 'data' })
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request with empty data when no data provided', async () => {
      const mockResponse = { success: true };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await apiClient.post('/test-endpoint');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test-endpoint',
        expect.objectContaining({
          body: JSON.stringify({})
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API error with JSON response', async () => {
      const errorData = { message: 'Bad Request', code: 'INVALID_INPUT' };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce(errorData)
      });

      const error = await apiClient.post('/test-endpoint').catch(e => e);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error.data).toEqual(errorData);
    });

    it('should handle API error without JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
      });

      const error = await apiClient.post('/test-endpoint').catch(e => e);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(500);
      expect(error.message).toBe('HTTP error 500');
      expect(error.data).toEqual({});
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      const error = await apiClient.post('/test-endpoint').catch(e => e);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(0);
      expect(error.message).toBe('Network error');
      expect(error.data).toEqual({ originalError: networkError });
    });

    it('should handle unknown errors', async () => {
      const unknownError = 'Unknown error';
      mockFetch.mockRejectedValueOnce(unknownError);

      const error = await apiClient.post('/test-endpoint').catch(e => e);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(0);
      expect(error.message).toBe('Network error');
      expect(error.data).toEqual({ originalError: unknownError });
    });

    it('should construct correct URL with base URL and endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({})
      });

      await apiClient.post('/api/v1/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/api/v1/test',
        expect.any(Object)
      );
    });

    it('should include all required headers', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({})
      });

      await apiClient.post('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'x-api-key': 'test-api-key',
            'Accept-Encoding': 'deflate',
            'Content-Type': 'application/json'
          }
        })
      );
    });

    it('should use POST method', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({})
      });

      await apiClient.post('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });
  });

  describe('error handling edge cases', () => {
    it('should handle response.json() throwing error on successful response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockRejectedValueOnce(new Error('JSON parse error'))
      });

      const error = await apiClient.post('/test').catch(e => e);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe('JSON parse error');
    });

    it('should re-throw ApiError instances without wrapping', async () => {
      const originalApiError = new ApiError('Original API Error', 403, { custom: 'data' });
      mockFetch.mockRejectedValueOnce(originalApiError);

      const error = await apiClient.post('/test').catch(e => e);
      expect(error).toBe(originalApiError);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(403);
      expect(error.data).toEqual({ custom: 'data' });
    });
  });
}); 