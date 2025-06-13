/**
 * Tests for TypeScript type definitions in the B2B Campaign Agent SDK
 */

import type {
  CampaignType,
  ConfidenceScore,
  PointOfContact,
  BusinessChannelType,
  BusinessChannels,
  Competitor,
  BusinessProfile,
  BusinessContacts,
  BusinessBranding,
  BusinessObject,
  CampaignFeedback,
  Campaign,
  CampaignObject,
  BusinessDiscoveryOptions,
  BusinessCompatibilityReasoning,
  BusinessCompatibilityScore,
  ApiClientConfig,
  B2BrilliantAgentConfig
} from './types';

describe('Type Definitions', () => {
  describe('CampaignType', () => {
    it('should allow valid campaign types', () => {
      const dmType: CampaignType = 'dm';
      const emailType: CampaignType = 'email';
      const smsType: CampaignType = 'sms';

      expect(dmType).toBe('dm');
      expect(emailType).toBe('email');
      expect(smsType).toBe('sms');
    });
  });

  describe('ConfidenceScore', () => {
    it('should have correct structure', () => {
      const confidence: ConfidenceScore = {
        score: 8.5,
        reasoning: 'High confidence based on analysis'
      };

      expect(confidence.score).toBe(8.5);
      expect(confidence.reasoning).toBe('High confidence based on analysis');
    });
  });

  describe('PointOfContact', () => {
    it('should have correct structure', () => {
      const contact: PointOfContact = {
        name: 'John Doe',
        position: 'CEO'
      };

      expect(contact.name).toBe('John Doe');
      expect(contact.position).toBe('CEO');
    });
  });

  describe('BusinessChannelType', () => {
    it('should allow valid channel types', () => {
      const facebook: BusinessChannelType = 'facebook';
      const instagram: BusinessChannelType = 'instagram';
      const linkedin: BusinessChannelType = 'linkedin';
      const twitter: BusinessChannelType = 'twitter';
      const tiktok: BusinessChannelType = 'tiktok';
      const email: BusinessChannelType = 'email';
      const sms: BusinessChannelType = 'sms';

      expect(facebook).toBe('facebook');
      expect(instagram).toBe('instagram');
      expect(linkedin).toBe('linkedin');
      expect(twitter).toBe('twitter');
      expect(tiktok).toBe('tiktok');
      expect(email).toBe('email');
      expect(sms).toBe('sms');
    });
  });

  describe('BusinessChannels', () => {
    it('should have correct structure', () => {
      const channel: BusinessChannels = {
        url: 'https://linkedin.com/company/example',
        type: 'linkedin'
      };

      expect(channel.url).toBe('https://linkedin.com/company/example');
      expect(channel.type).toBe('linkedin');
    });
  });

  describe('Competitor', () => {
    it('should have correct structure', () => {
      const competitor: Competitor = {
        businessName: 'Competitor Inc',
        url: 'https://competitor.com',
        advantages: ['Lower prices', 'Faster delivery'],
        disadvantages: ['Limited features', 'Poor support'],
        recommendations: ['Improve pricing', 'Enhance features']
      };

      expect(competitor.businessName).toBe('Competitor Inc');
      expect(competitor.url).toBe('https://competitor.com');
      expect(competitor.advantages).toHaveLength(2);
      expect(competitor.disadvantages).toHaveLength(2);
      expect(competitor.recommendations).toHaveLength(2);
    });
  });

  describe('BusinessProfile', () => {
    it('should have correct structure', () => {
      const profile: BusinessProfile = {
        name: 'Test Business',
        summary: 'A test business for testing purposes',
        services: ['Service 1', 'Service 2'],
        currentEvents: 'Recently launched new product',
        targetAudience: 'Small to medium businesses',
        industry: 'Technology'
      };

      expect(profile.name).toBe('Test Business');
      expect(profile.summary).toBe('A test business for testing purposes');
      expect(profile.services).toHaveLength(2);
      expect(profile.currentEvents).toBe('Recently launched new product');
      expect(profile.targetAudience).toBe('Small to medium businesses');
      expect(profile.industry).toBe('Technology');
    });
  });

  describe('BusinessContacts', () => {
    it('should have correct structure with optional pointOfContact', () => {
      const contacts: BusinessContacts = {
        pointOfContact: {
          name: 'Jane Smith',
          position: 'Marketing Director'
        },
        social: [
          {
            url: 'https://linkedin.com/company/test',
            type: 'linkedin'
          }
        ],
        email: 'contact@test.com',
        phone: '555-123-4567'
      };

      expect(contacts.pointOfContact?.name).toBe('Jane Smith');
      expect(contacts.pointOfContact?.position).toBe('Marketing Director');
      expect(contacts.social).toHaveLength(1);
      expect(contacts.email).toBe('contact@test.com');
      expect(contacts.phone).toBe('555-123-4567');
    });

    it('should work without pointOfContact', () => {
      const contacts: BusinessContacts = {
        social: [],
        email: 'contact@test.com',
        phone: '555-123-4567'
      };

      expect(contacts.pointOfContact).toBeUndefined();
      expect(contacts.social).toHaveLength(0);
      expect(contacts.email).toBe('contact@test.com');
      expect(contacts.phone).toBe('555-123-4567');
    });
  });

  describe('BusinessBranding', () => {
    it('should have correct structure', () => {
      const branding: BusinessBranding = {
        voice: 'Professional',
        tone: 'Friendly',
        style: 'Modern',
        phrases: ['Innovation at its best', 'Quality first']
      };

      expect(branding.voice).toBe('Professional');
      expect(branding.tone).toBe('Friendly');
      expect(branding.style).toBe('Modern');
      expect(branding.phrases).toHaveLength(2);
    });
  });

  describe('BusinessObject', () => {
    it('should have correct structure with optional competitors', () => {
      const business: BusinessObject = {
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
        competitors: [
          {
            businessName: 'Competitor',
            url: 'https://competitor.com',
            advantages: ['Advantage 1'],
            disadvantages: ['Disadvantage 1'],
            recommendations: ['Recommendation 1']
          }
        ],
        confidence: {
          score: 8.5,
          reasoning: 'High confidence'
        }
      };

      expect(business.profile.name).toBe('Test Business');
      expect(business.contacts.email).toBe('test@example.com');
      expect(business.branding.voice).toBe('Professional');
      expect(business.competitors).toHaveLength(1);
      expect(business.confidence.score).toBe(8.5);
    });

    it('should work without competitors', () => {
      const business: BusinessObject = {
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

      expect(business.competitors).toBeUndefined();
    });
  });

  describe('Campaign', () => {
    it('should have correct structure', () => {
      const campaign: Campaign = {
        type: 'email',
        content: 'Email campaign content',
        rating: 8.5,
        feedback: {
          strengths: ['Good subject line', 'Clear call to action'],
          weaknesses: ['Too long', 'Could be more personal'],
          suggestions: ['Shorten content', 'Add personalization']
        }
      };

      expect(campaign.type).toBe('email');
      expect(campaign.content).toBe('Email campaign content');
      expect(campaign.rating).toBe(8.5);
      expect(campaign.feedback.strengths).toHaveLength(2);
      expect(campaign.feedback.weaknesses).toHaveLength(2);
      expect(campaign.feedback.suggestions).toHaveLength(2);
    });
  });

  describe('CampaignObject', () => {
    it('should have correct structure', () => {
      const campaignObject: CampaignObject = {
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
          },
          {
            type: 'dm',
            content: 'DM content',
            rating: 7.8,
            feedback: {
              strengths: ['Personal'],
              weaknesses: ['Too casual'],
              suggestions: ['More professional tone']
            }
          }
        ]
      };

      expect(campaignObject.targetBusiness).toBe('Target Business');
      expect(campaignObject.userBusiness).toBe('User Business');
      expect(campaignObject.campaigns).toHaveLength(2);
      expect(campaignObject.campaigns[0].type).toBe('email');
      expect(campaignObject.campaigns[1].type).toBe('dm');
    });
  });

  describe('BusinessCompatibilityScore', () => {
    it('should have correct structure', () => {
      const compatibility: BusinessCompatibilityScore = {
        targetBusiness: 'Target Business',
        userBusiness: 'User Business',
        score: 8.5,
        reasoning: {
          positives: ['Similar industries', 'Complementary services'],
          negatives: ['Different target audiences'],
          recommendations: ['Focus on shared values', 'Emphasize unique benefits']
        }
      };

      expect(compatibility.targetBusiness).toBe('Target Business');
      expect(compatibility.userBusiness).toBe('User Business');
      expect(compatibility.score).toBe(8.5);
      expect(compatibility.reasoning.positives).toHaveLength(2);
      expect(compatibility.reasoning.negatives).toHaveLength(1);
      expect(compatibility.reasoning.recommendations).toHaveLength(2);
    });
  });

  describe('Configuration Types', () => {
    it('should define ApiClientConfig correctly', () => {
      const config: ApiClientConfig = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com'
      };

      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseUrl).toBe('https://api.test.com');
    });

    it('should define B2BrilliantAgentConfig correctly', () => {
      const config: B2BrilliantAgentConfig = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com'
      };

      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseUrl).toBe('https://api.test.com');
    });

    it('should allow B2BrilliantAgentConfig without baseUrl', () => {
      const config: B2BrilliantAgentConfig = {
        apiKey: 'test-api-key'
      };

      expect(config.apiKey).toBe('test-api-key');
      expect(config.baseUrl).toBeUndefined();
    });
  });
}); 