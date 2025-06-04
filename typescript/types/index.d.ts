/**
 * B2B Campaign Agent TypeScript SDK
 *
 * A TypeScript client for the B2B Campaign Agent API.
 */
import type { BusinessObject, BusinessDiscoveryOptions, BusinessCompatibilityScore, CampaignObject, CampaignType, B2BrilliantAgentConfig } from './types';
/**
 * Main SDK Agent class that provides access to all B2B Campaign Agent APIs
 */
export declare class B2BrilliantAgent {
    private readonly apiClient;
    /**
     * User-related API methods
     */
    readonly user: {
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
    readonly business: {
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
    readonly campaigns: {
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
    constructor(config: B2BrilliantAgentConfig);
}
export * from './types';
export * from './errors';
export * from './endpoints';
export { ApiClient } from './apiClient';
export default B2BrilliantAgent;
