/**
 * B2B Campaign Agent TypeScript SDK
 * 
 * A TypeScript client for the B2B Campaign Agent API.
 */

import { ApiClient } from './apiClient';
import { USER_ENDPOINTS, BUSINESS_ENDPOINTS, CAMPAIGN_ENDPOINTS } from './endpoints';
import type {
  BusinessObject,
  BusinessDiscoveryOptions,
  BusinessCompatibilityScore,
  CampaignObject,
  CampaignType,
  B2BrilliantAgentConfig
} from './types';

/**
 * Main SDK Agent class that provides access to all B2B Campaign Agent APIs
 */
export class B2BrilliantAgent {
  private readonly apiClient: ApiClient;

  /**
   * User-related API methods
   */
  public readonly user: {
    /**
     * Discover information about your business
     * 
     * @param urls - Array of URLs to your business website
     * @param options - Additional options
     * @returns Business object
     */
    discover: (urls: string[], options?: BusinessDiscoveryOptions) => Promise<BusinessObject>;

    /**
     * Refine information about your business
     * 
     * @param business - Business object from discover
     * @param feedback - Feedback to improve the business information
     * @returns Refined business object
     */
    refine: (business: BusinessObject, feedback: string) => Promise<BusinessObject>;
  };

  /**
   * Business-related API methods
   */
  public readonly business: {
    /**
     * Discover information about a target business
     * 
     * @param urls - Array of URLs to the target business website
     * @param options - Additional options
     * @returns Business object
     */
    discover: (urls: string[], options?: BusinessDiscoveryOptions) => Promise<BusinessObject>;

    /**
     * Refine information about a target business
     * 
     * @param business - Business object from discover
     * @param feedback - Feedback to improve the business information
     * @returns Refined business object
     */
    refine: (business: BusinessObject, feedback: string) => Promise<BusinessObject>;

    /**
     * Assess compatibility between your business and a target business
     * 
     * @param userBusiness - Your business object
     * @param targetBusiness - Target business object
     * @returns Compatibility score and reasoning
     */
    compatibility: (userBusiness: BusinessObject, targetBusiness: BusinessObject) => Promise<BusinessCompatibilityScore>;
  };

  /**
   * Campaign-related API methods
   */
  public readonly campaigns: {
    /**
     * Create campaigns for a target business
     * 
     * @param userBusiness - Your business object
     * @param targetBusiness - Target business object
     * @param campaignTypes - Campaign types to generate
     * @returns Campaign object
     */
    create: (userBusiness: BusinessObject, targetBusiness: BusinessObject, campaignTypes?: CampaignType[]) => Promise<CampaignObject>;

    /**
     * Refine campaigns based on feedback
     * 
     * @param userBusiness - Your business object
     * @param targetBusiness - Target business object
     * @param campaign - Campaign object from create
     * @param feedback - Feedback to improve the campaigns
     * @returns Refined campaign object
     */
    refine: (userBusiness: BusinessObject, targetBusiness: BusinessObject, campaign: CampaignObject, feedback: string) => Promise<CampaignObject>;
  };

  /**
   * Create a new B2B Campaign Agent client
   * 
   * @param config - Configuration options
   */
  constructor(config: B2BrilliantAgentConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiClient = new ApiClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || 'https://api.b2brilliant.app',
    });

    // Initialize user namespace
    this.user = {
      discover: (urls: string[], options: BusinessDiscoveryOptions = {}) => {
        return this.apiClient.post<BusinessObject>(USER_ENDPOINTS.DISCOVER, { urls, options });
      },

      refine: (business: BusinessObject, feedback: string) => {
        return this.apiClient.post<BusinessObject>(USER_ENDPOINTS.REFINE, { business, feedback });
      }
    };

    // Initialize business namespace
    this.business = {
      discover: (urls: string[], options: BusinessDiscoveryOptions = {}) => {
        return this.apiClient.post<BusinessObject>(BUSINESS_ENDPOINTS.DISCOVER, { urls, options });
      },

      refine: (business: BusinessObject, feedback: string) => {
        return this.apiClient.post<BusinessObject>(BUSINESS_ENDPOINTS.REFINE, { business, feedback });
      },

      compatibility: (userBusiness: BusinessObject, targetBusiness: BusinessObject) => {
        return this.apiClient.post<BusinessCompatibilityScore>(BUSINESS_ENDPOINTS.COMPATIBILITY, { userBusiness, targetBusiness });
      }
    };

    // Initialize campaigns namespace
    this.campaigns = {
      create: (userBusiness: BusinessObject, targetBusiness: BusinessObject, campaignTypes: CampaignType[] = ['dm', 'email', 'sms']) => {
        return this.apiClient.post<CampaignObject>(CAMPAIGN_ENDPOINTS.CREATE, { userBusiness, targetBusiness, campaignTypes });
      },

      refine: (userBusiness: BusinessObject, targetBusiness: BusinessObject, campaign: CampaignObject, feedback: string) => {
        return this.apiClient.post<CampaignObject>(CAMPAIGN_ENDPOINTS.REFINE, { userBusiness, targetBusiness, campaign, feedback });
      }
    };
  }
}

// Export everything
export * from './types';
export * from './errors';
export * from './endpoints';
export { ApiClient } from './apiClient';

// Default export
export default B2BrilliantAgent;
