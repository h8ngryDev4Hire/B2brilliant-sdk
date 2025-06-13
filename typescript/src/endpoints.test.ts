/**
 * Tests for API endpoints in the B2B Campaign Agent SDK
 */

import { USER_ENDPOINTS, BUSINESS_ENDPOINTS, CAMPAIGN_ENDPOINTS } from './endpoints';

describe('USER_ENDPOINTS', () => {
  it('should have correct DISCOVER endpoint', () => {
    expect(USER_ENDPOINTS.DISCOVER).toBe('/api/v1/user/discover');
  });

  it('should have correct REFINE endpoint', () => {
    expect(USER_ENDPOINTS.REFINE).toBe('/api/v1/user/refine');
  });

  it('should have all required endpoints', () => {
    const expectedKeys = ['DISCOVER', 'REFINE'];
    const actualKeys = Object.keys(USER_ENDPOINTS);
    
    expect(actualKeys.sort()).toEqual(expectedKeys.sort());
    expect(actualKeys).toHaveLength(expectedKeys.length);
  });
});

describe('BUSINESS_ENDPOINTS', () => {
  it('should have correct DISCOVER endpoint', () => {
    expect(BUSINESS_ENDPOINTS.DISCOVER).toBe('/api/v1/business/discover');
  });

  it('should have correct REFINE endpoint', () => {
    expect(BUSINESS_ENDPOINTS.REFINE).toBe('/api/v1/business/refine');
  });

  it('should have correct COMPATIBILITY endpoint', () => {
    expect(BUSINESS_ENDPOINTS.COMPATIBILITY).toBe('/api/v1/business/compatibility');
  });

  it('should have all required endpoints', () => {
    const expectedKeys = ['DISCOVER', 'REFINE', 'COMPATIBILITY'];
    const actualKeys = Object.keys(BUSINESS_ENDPOINTS);
    
    expect(actualKeys.sort()).toEqual(expectedKeys.sort());
    expect(actualKeys).toHaveLength(expectedKeys.length);
  });
});

describe('CAMPAIGN_ENDPOINTS', () => {
  it('should have correct CREATE endpoint', () => {
    expect(CAMPAIGN_ENDPOINTS.CREATE).toBe('/api/v1/campaigns/create');
  });

  it('should have correct REFINE endpoint', () => {
    expect(CAMPAIGN_ENDPOINTS.REFINE).toBe('/api/v1/campaigns/refine');
  });

  it('should have all required endpoints', () => {
    const expectedKeys = ['CREATE', 'REFINE'];
    const actualKeys = Object.keys(CAMPAIGN_ENDPOINTS);
    
    expect(actualKeys.sort()).toEqual(expectedKeys.sort());
    expect(actualKeys).toHaveLength(expectedKeys.length);
  });
});

describe('All Endpoints', () => {
  it('should follow consistent API versioning pattern', () => {
    const allEndpoints = [
      ...Object.values(USER_ENDPOINTS),
      ...Object.values(BUSINESS_ENDPOINTS),
      ...Object.values(CAMPAIGN_ENDPOINTS)
    ];

    allEndpoints.forEach(endpoint => {
      expect(endpoint).toMatch(/^\/api\/v\d+\//);
    });
  });

  it('should have unique endpoints', () => {
    const allEndpoints = [
      ...Object.values(USER_ENDPOINTS),
      ...Object.values(BUSINESS_ENDPOINTS),
      ...Object.values(CAMPAIGN_ENDPOINTS)
    ];

    const uniqueEndpoints = new Set(allEndpoints);
    expect(uniqueEndpoints.size).toBe(allEndpoints.length);
  });

  it('should use consistent naming conventions', () => {
    const allEndpoints = [
      ...Object.values(USER_ENDPOINTS),
      ...Object.values(BUSINESS_ENDPOINTS),
      ...Object.values(CAMPAIGN_ENDPOINTS)
    ];

    allEndpoints.forEach(endpoint => {
      // Should use lowercase and forward slashes
      expect(endpoint).toMatch(/^[/a-z0-9-]+$/);
      // Should not end with slash
      expect(endpoint).not.toMatch(/\/$/);
    });
  });
}); 