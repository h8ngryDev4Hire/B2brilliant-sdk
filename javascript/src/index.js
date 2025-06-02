/**
 * B2B Campaign Agent JavaScript SDK
 * 
 * A JavaScript client for the B2B Campaign Agent API.
 */

const ApiClient = require('./apiClient');
const { USER_ENDPOINTS, BUSINESS_ENDPOINTS, CAMPAIGN_ENDPOINTS } = require('./endpoints');

// Import JSDoc types
require('./types');

/**
 * Main SDK Agent class that provides access to all B2B Campaign Agent APIs
 */
class Agent {
  /**
   * Create a new B2B Campaign Agent client
   * 
   * @param {Object} config - Configuration options
   * @param {string} config.apiKey - Your API key
   * @param {string} [config.baseUrl="https://b2brilliant.app"] - API base URL
   */
  constructor(config = {}) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiClient = new ApiClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || 'https://b2brilliant.app',
    });

    // Initialize namespaces
    this.user = {
      /**
       * Discover information about your business
       * 
       * @param {string[]} urls - Array of URLs to your business website
       * @param {BusinessDiscoveryOptions} [options] - Additional options
       * @returns {Promise<BusinessObject>} Business object
       */
      discover: (urls, options = {}) => {
        return this.apiClient.post(USER_ENDPOINTS.DISCOVER, { urls, options });
      },

      /**
       * Refine information about your business
       * 
       * @param {BusinessObject} business - Business object from discover
       * @param {string} feedback - Feedback to improve the business information
       * @returns {Promise<BusinessObject>} Refined business object
       */
      refine: (business, feedback) => {
        return this.apiClient.post(USER_ENDPOINTS.REFINE, { business, feedback });
      }
    };

    this.business = {
      /**
       * Discover information about a target business
       * 
       * @param {string[]} urls - Array of URLs to the target business website
       * @param {BusinessDiscoveryOptions} [options] - Additional options
       * @returns {Promise<BusinessObject>} Business object
       */
      discover: (urls, options = {}) => {
        return this.apiClient.post(BUSINESS_ENDPOINTS.DISCOVER, { urls, options });
      },

      /**
       * Refine information about a target business
       * 
       * @param {BusinessObject} business - Business object from discover
       * @param {string} feedback - Feedback to improve the business information
       * @returns {Promise<BusinessObject>} Refined business object
       */
      refine: (business, feedback) => {
        return this.apiClient.post(BUSINESS_ENDPOINTS.REFINE, { business, feedback });
      },

      /**
       * Assess compatibility between your business and a target business
       * 
       * @param {BusinessObject} userBusiness - Your business object
       * @param {BusinessObject} targetBusiness - Target business object
       * @returns {Promise<BusinessCompatibilityScore>} Compatibility score and reasoning
       */
      compatibility: (userBusiness, targetBusiness) => {
        return this.apiClient.post(BUSINESS_ENDPOINTS.COMPATIBILITY, { userBusiness, targetBusiness });
      }
    };

    this.campaigns = {
      /**
       * Create campaigns for a target business
       * 
       * @param {BusinessObject} userBusiness - Your business object
       * @param {BusinessObject} targetBusiness - Target business object
       * @param {CampaignType[]} [campaignTypes=['dm', 'email', 'sms']] - Campaign types to generate
       * @returns {Promise<CampaignObject>} Campaign object
       */
      create: (userBusiness, targetBusiness, campaignTypes = ['dm', 'email', 'sms']) => {
        return this.apiClient.post(CAMPAIGN_ENDPOINTS.CREATE, { userBusiness, targetBusiness, campaignTypes });
      },

      /**
       * Refine campaigns based on feedback
       * 
       * @param {BusinessObject} userBusiness - Your business object
       * @param {BusinessObject} targetBusiness - Target business object
       * @param {CampaignObject} campaign - Campaign object from create
       * @param {string} feedback - Feedback to improve the campaigns
       * @returns {Promise<CampaignObject>} Refined campaign object
       */
      refine: (userBusiness, targetBusiness, campaign, feedback) => {
        return this.apiClient.post(CAMPAIGN_ENDPOINTS.REFINE, { userBusiness, targetBusiness, campaign, feedback });
      }
    };
  }
}

module.exports = Agent; 