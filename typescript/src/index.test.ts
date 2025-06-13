/**
 * Tests for B2BrilliantAgent main SDK class
 */

import { B2BrilliantAgent } from './index';
import { ApiClient } from './apiClient';
import { USER_ENDPOINTS, BUSINESS_ENDPOINTS, CAMPAIGN_ENDPOINTS } from './endpoints';
import type { BusinessObject, BusinessCompatibilityScore, CampaignObject } from './types';

// Mock the ApiClient
jest.mock('./apiClient');
const MockedApiClient = ApiClient as jest.MockedClass<typeof ApiClient>;

describe('B2BrilliantAgent', () => {
  let agent: B2BrilliantAgent;
  let mockApiClient: jest.Mocked<Pick<ApiClient, 'post'>>;

  const mockConfig = {
    apiKey: 'test-api-key',
    baseUrl: 'https://api.test.com'
  };

  beforeEach(() => {
    MockedApiClient.mockClear();
    mockApiClient = {
      post: jest.fn()
    };
    MockedApiClient.mockImplementation(() => mockApiClient as any);
    
    agent = new B2BrilliantAgent(mockConfig);
  });

  describe('constructor', () => {
    it('should create agent with API key', () => {
      expect(agent).toBeInstanceOf(B2BrilliantAgent);
      expect(MockedApiClient).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com'
      });
    });

    it('should use default base URL when not provided', () => {
      const agentWithoutBaseUrl = new B2BrilliantAgent({ apiKey: 'test-key' });
      expect(MockedApiClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        baseUrl: 'https://api.b2brilliant.app'
      });
    });

    it('should throw error when API key is not provided', () => {
      expect(() => {
        new B2BrilliantAgent({ apiKey: '' });
      }).toThrow('API key is required');
    });

    it('should initialize all namespaces', () => {
      expect(agent.user).toBeDefined();
      expect(agent.business).toBeDefined();
      expect(agent.campaigns).toBeDefined();
    });
  });

  describe('user namespace', () => {
    const mockBusinessObject: BusinessObject = {
      profile: {
        name: 'Test Business',
        summary: 'A test business',
        services: ['Service 1'],
        currentEvents: 'Recent events',
        targetAudience: 'Target audience',
        industry: 'Tech'
      },
      contacts: {
        social: [],
        email: 'test@example.com',
        phone: '123-456-7890'
      },
      branding: {
        voice: 'Professional',
        tone: 'Friendly',
        style: 'Modern',
        phrases: ['Tagline']
      },
      confidence: {
        score: 8.5,
        reasoning: 'High confidence'
      }
    };

    describe('discover', () => {
      it('should call user discover endpoint with URLs', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const result = await agent.user.discover(['https://example.com']);

        expect(mockApiClient.post).toHaveBeenCalledWith(USER_ENDPOINTS.DISCOVER, {
          urls: ['https://example.com'],
          options: {}
        });
        expect(result).toEqual(mockBusinessObject);
      });

      it('should call user discover endpoint with URLs and options', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const options = {
          findCompetitors: true,
          findBranding: true,
          deepSearch: false
        };

        const result = await agent.user.discover(['https://example.com'], options);

        expect(mockApiClient.post).toHaveBeenCalledWith(USER_ENDPOINTS.DISCOVER, {
          urls: ['https://example.com'],
          options
        });
        expect(result).toEqual(mockBusinessObject);
      });
    });

    describe('refine', () => {
      it('should call user refine endpoint', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const result = await agent.user.refine(mockBusinessObject, 'Additional info');

        expect(mockApiClient.post).toHaveBeenCalledWith(USER_ENDPOINTS.REFINE, {
          business: mockBusinessObject,
          feedback: 'Additional info'
        });
        expect(result).toEqual(mockBusinessObject);
      });
    });
  });

  describe('business namespace', () => {
    const mockBusinessObject: BusinessObject = {
      profile: {
        name: 'Target Business',
        summary: 'A target business',
        services: ['Service A'],
        currentEvents: 'Recent events',
        targetAudience: 'Target audience',
        industry: 'Finance'
      },
      contacts: {
        social: [],
        email: 'target@example.com',
        phone: '987-654-3210'
      },
      branding: {
        voice: 'Authoritative',
        tone: 'Serious',
        style: 'Corporate',
        phrases: ['Slogan']
      },
      confidence: {
        score: 7.2,
        reasoning: 'Good confidence'
      }
    };

    describe('discover', () => {
      it('should call business discover endpoint', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const result = await agent.business.discover(['https://target.com']);

        expect(mockApiClient.post).toHaveBeenCalledWith(BUSINESS_ENDPOINTS.DISCOVER, {
          urls: ['https://target.com'],
          options: {}
        });
        expect(result).toEqual(mockBusinessObject);
      });

      it('should call business discover endpoint with options', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const options = { findBranding: true };
        const result = await agent.business.discover(['https://target.com'], options);

        expect(mockApiClient.post).toHaveBeenCalledWith(BUSINESS_ENDPOINTS.DISCOVER, {
          urls: ['https://target.com'],
          options
        });
        expect(result).toEqual(mockBusinessObject);
      });
    });

    describe('refine', () => {
      it('should call business refine endpoint', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockBusinessObject);

        const result = await agent.business.refine(mockBusinessObject, 'Refinement feedback');

        expect(mockApiClient.post).toHaveBeenCalledWith(BUSINESS_ENDPOINTS.REFINE, {
          business: mockBusinessObject,
          feedback: 'Refinement feedback'
        });
        expect(result).toEqual(mockBusinessObject);
      });
    });

    describe('compatibility', () => {
      it('should call business compatibility endpoint', async () => {
        const mockCompatibility: BusinessCompatibilityScore = {
          targetBusiness: 'Target Business',
          userBusiness: 'User Business',
          score: 8.5,
          reasoning: {
            positives: ['Good match'],
            negatives: ['Some concerns'],
            recommendations: ['Recommendation']
          }
        };

        mockApiClient.post.mockResolvedValueOnce(mockCompatibility);

        const userBusiness = { ...mockBusinessObject, profile: { ...mockBusinessObject.profile, name: 'User Business' } };
        const targetBusiness = { ...mockBusinessObject, profile: { ...mockBusinessObject.profile, name: 'Target Business' } };

        const result = await agent.business.compatibility(userBusiness, targetBusiness);

        expect(mockApiClient.post).toHaveBeenCalledWith(BUSINESS_ENDPOINTS.COMPATIBILITY, {
          userBusiness,
          targetBusiness
        });
        expect(result).toEqual(mockCompatibility);
      });
    });
  });

  describe('campaigns namespace', () => {
    const mockUserBusiness: BusinessObject = {
      profile: {
        name: 'User Business',
        summary: 'User business summary',
        services: ['Service 1'],
        currentEvents: 'Events',
        targetAudience: 'Audience',
        industry: 'Tech'
      },
      contacts: {
        social: [],
        email: 'user@example.com',
        phone: '123-456-7890'
      },
      branding: {
        voice: 'Professional',
        tone: 'Friendly',
        style: 'Modern',
        phrases: ['Tagline']
      },
      confidence: {
        score: 8.0,
        reasoning: 'High confidence'
      }
    };

    const mockTargetBusiness: BusinessObject = {
      profile: {
        name: 'Target Business',
        summary: 'Target business summary',
        services: ['Service A'],
        currentEvents: 'Events',
        targetAudience: 'Audience',
        industry: 'Finance'
      },
      contacts: {
        social: [],
        email: 'target@example.com',
        phone: '987-654-3210'
      },
      branding: {
        voice: 'Authoritative',
        tone: 'Serious',
        style: 'Corporate',
        phrases: ['Slogan']
      },
      confidence: {
        score: 7.5,
        reasoning: 'Good confidence'
      }
    };

    const mockCampaign: CampaignObject = {
      targetBusiness: 'Target Business',
      userBusiness: 'User Business',
      campaigns: [
        {
          type: 'email',
          content: 'Email content',
          rating: 8.5,
          feedback: {
            strengths: ['Good tone'],
            weaknesses: ['Could be shorter'],
            suggestions: ['Add call to action']
          }
        }
      ]
    };

    describe('create', () => {
      it('should call campaign create endpoint with default campaign types', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockCampaign);

        const result = await agent.campaigns.create(mockUserBusiness, mockTargetBusiness);

        expect(mockApiClient.post).toHaveBeenCalledWith(CAMPAIGN_ENDPOINTS.CREATE, {
          userBusiness: mockUserBusiness,
          targetBusiness: mockTargetBusiness,
          campaignTypes: ['dm', 'email', 'sms']
        });
        expect(result).toEqual(mockCampaign);
      });

      it('should call campaign create endpoint with specific campaign types', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockCampaign);

        const result = await agent.campaigns.create(mockUserBusiness, mockTargetBusiness, ['email', 'dm']);

        expect(mockApiClient.post).toHaveBeenCalledWith(CAMPAIGN_ENDPOINTS.CREATE, {
          userBusiness: mockUserBusiness,
          targetBusiness: mockTargetBusiness,
          campaignTypes: ['email', 'dm']
        });
        expect(result).toEqual(mockCampaign);
      });
    });

    describe('refine', () => {
      it('should call campaign refine endpoint', async () => {
        mockApiClient.post.mockResolvedValueOnce(mockCampaign);

        const result = await agent.campaigns.refine(
          mockUserBusiness,
          mockTargetBusiness,
          mockCampaign,
          'Make it more casual'
        );

        expect(mockApiClient.post).toHaveBeenCalledWith(CAMPAIGN_ENDPOINTS.REFINE, {
          userBusiness: mockUserBusiness,
          targetBusiness: mockTargetBusiness,
          campaign: mockCampaign,
          feedback: 'Make it more casual'
        });
        expect(result).toEqual(mockCampaign);
      });
    });
  });

  describe('error handling', () => {
    it('should propagate errors from API client', async () => {
      const apiError = new Error('API Error');
      mockApiClient.post.mockRejectedValueOnce(apiError);

      await expect(agent.user.discover(['https://example.com'])).rejects.toThrow('API Error');
    });
  });

  describe('integration', () => {
    it('should have consistent method signatures across namespaces', () => {
      // Test that all discover methods have similar signatures
      expect(typeof agent.user.discover).toBe('function');
      expect(typeof agent.business.discover).toBe('function');
      
      // Test that all refine methods have similar signatures
      expect(typeof agent.user.refine).toBe('function');
      expect(typeof agent.business.refine).toBe('function');
      expect(typeof agent.campaigns.refine).toBe('function');
    });
  });
}); 