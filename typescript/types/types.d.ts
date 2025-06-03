/**
 * TypeScript type definitions for the B2B Campaign Agent SDK
 */
export type CampaignType = 'dm' | 'email' | 'sms';
export interface ConfidenceScore {
    score: number;
    reasoning: string;
}
export interface PointOfContact {
    name: string;
    position: string;
}
export type BusinessChannelType = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'email' | 'sms';
export interface BusinessChannels {
    url: string;
    type: BusinessChannelType;
}
export interface Competitor {
    businessName: string;
    url: string;
    advantages: string[];
    disadvantages: string[];
    recommendations: string[];
}
export interface BusinessProfile {
    name: string;
    summary: string;
    services: string[];
    currentEvents: string;
    targetAudience: string;
    industry: string;
}
export interface BusinessContacts {
    pointOfContact?: PointOfContact;
    social: BusinessChannels[];
    email: string;
    phone: string;
}
export interface BusinessBranding {
    voice: string;
    tone: string;
    style: string;
    phrases: string[];
}
export interface BusinessObject {
    profile: BusinessProfile;
    contacts: BusinessContacts;
    branding: BusinessBranding;
    competitors?: Competitor[];
    confidence: ConfidenceScore;
}
export interface CampaignFeedback {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
}
export interface Campaign {
    type: CampaignType;
    content: string;
    rating: number;
    feedback: CampaignFeedback;
}
export interface CampaignObject {
    targetBusiness: string;
    userBusiness: string;
    campaigns: Campaign[];
}
export interface BusinessDiscoveryOptions {
    findCompetitors?: boolean;
    findBranding?: boolean;
    deepSearch?: boolean;
    pointOfContact?: PointOfContact;
}
export interface BusinessCompatibilityReasoning {
    positives: string[];
    negatives: string[];
    recommendations: string[];
}
export interface BusinessCompatibilityScore {
    targetBusiness: string;
    userBusiness: string;
    score: number;
    reasoning: BusinessCompatibilityReasoning;
}
export interface ApiClientConfig {
    apiKey: string;
    baseUrl: string;
}
export interface B2BrilliantAgentConfig {
    apiKey: string;
    baseUrl?: string;
}
