/**
 * TypeScript type definitions for the B2B Campaign Agent SDK
 */

export type CampaignType = 'dm' | 'email' | 'sms';

export interface ConfidenceScore {
  score: number; // Confidence score from 0-10
  reasoning: string; // Reasoning behind the score
}

export interface PointOfContact {
  name: string; // Name of the contact person
  position: string; // Position or job title
}

export type BusinessChannelType = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'email' | 'sms';

export interface BusinessChannels {
  url: string; // URL of the social profile
  type: BusinessChannelType; // Type of channel
}

export interface Competitor {
  businessName: string; // Name of the competitor
  url: string; // Business URL of the competitor
  advantages: string[]; // 3-5 advantages of the competitor
  disadvantages: string[]; // 3-5 disadvantages of the competitor
  recommendations: string[]; // 3-5 recommendations for the business
}

export interface BusinessProfile {
  name: string; // Name of the business
  summary: string; // Brief 3-5 sentence description
  services: string[]; // List of services offered
  currentEvents: string; // Brief 1-3 sentence description of current activities
  targetAudience: string; // Target audience
  industry: string; // Industry name
}

export interface BusinessContacts {
  pointOfContact?: PointOfContact; // Main point of contact
  social: BusinessChannels[]; // Social media channels
  email: string; // Email address
  phone: string; // Phone number
}

export interface BusinessBranding {
  voice: string; // Brand voice
  tone: string; // Brand tone
  style: string; // Brand style
  phrases: string[]; // Taglines, slogans, etc.
}

export interface BusinessObject {
  profile: BusinessProfile; // Business profile information
  contacts: BusinessContacts; // Contact information
  branding: BusinessBranding; // Branding information
  competitors?: Competitor[]; // List of competitors
  confidence: ConfidenceScore; // Confidence score
}

export interface CampaignFeedback {
  strengths: string[]; // List of campaign strengths
  weaknesses: string[]; // List of campaign weaknesses
  suggestions: string[]; // List of improvement suggestions
}

export interface Campaign {
  type: CampaignType; // Type of campaign
  content: string; // Campaign content
  rating: number; // Campaign rating score
  feedback: CampaignFeedback; // Campaign feedback
}

export interface CampaignObject {
  targetBusiness: string; // Target business name
  userBusiness: string; // User business name
  campaigns: Campaign[]; // List of campaigns
}

export interface BusinessDiscoveryOptions {
  findCompetitors?: boolean; // Whether to find competitors
  findBranding?: boolean; // Whether to find branding information
  deepSearch?: boolean; // Whether to perform a deep search
  pointOfContact?: PointOfContact; // Point of contact
}

export interface BusinessCompatibilityReasoning {
  positives: string[]; // Positive reasons
  negatives: string[]; // Negative reasons
  recommendations: string[]; // Recommendations
}

export interface BusinessCompatibilityScore {
  targetBusiness: string; // Target business name
  userBusiness: string; // User business name
  score: number; // Compatibility score
  reasoning: BusinessCompatibilityReasoning; // Reasoning behind the score
}

export interface ApiClientConfig {
  apiKey: string;
  baseUrl: string;
}

export interface B2BrilliantAgentConfig {
  apiKey: string;
  baseUrl?: string;
}
