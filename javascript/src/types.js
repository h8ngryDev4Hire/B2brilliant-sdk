/**
 * JavaScript type definitions based on the b2b-campaign-agent package
 * 
 * These JSDoc type definitions help document the structure of objects
 * used in the API, similar to the TypeScript types in b2b-campaign-agent.
 */

/**
 * Campaign type enum
 * @typedef {('dm'|'email'|'sms')} CampaignType
 */

/**
 * @typedef {Object} ConfidenceScore
 * @property {number} score - Confidence score from 0-10
 * @property {string} reasoning - Reasoning behind the score
 */

/**
 * @typedef {Object} PointOfContact
 * @property {string} name - Name of the contact person
 * @property {string} position - Position or job title
 */

/**
 * @typedef {Object} BusinessChannels
 * @property {string} url - URL of the social profile
 * @property {('facebook'|'instagram'|'linkedin'|'twitter'|'tiktok'|'email'|'sms')} type - Type of channel
 */

/**
 * @typedef {Object} Competitor
 * @property {string} businessName - Name of the competitor
 * @property {string} url - Business URL of the competitor
 * @property {string[]} advantages - 3-5 advantages of the competitor
 * @property {string[]} disadvantages - 3-5 disadvantages of the competitor
 * @property {string[]} recommendations - 3-5 recommendations for the business
 */

/**
 * @typedef {Object} BusinessObject
 * @property {Object} profile - Business profile information
 * @property {string} profile.name - Name of the business
 * @property {string} profile.summary - Brief 3-5 sentence description
 * @property {string[]} profile.services - List of services offered
 * @property {string} profile.currentEvents - Brief 1-3 sentence description of current activities
 * @property {string} profile.targetAudience - Target audience
 * @property {string} profile.industry - Industry name
 * @property {Object} contacts - Contact information
 * @property {PointOfContact} [contacts.pointOfContact] - Main point of contact
 * @property {BusinessChannels[]} contacts.social - Social media channels
 * @property {string} contacts.email - Email address
 * @property {string} contacts.phone - Phone number
 * @property {Object} branding - Branding information
 * @property {string} branding.voice - Brand voice
 * @property {string} branding.tone - Brand tone
 * @property {string} branding.style - Brand style
 * @property {string[]} branding.phrases - Taglines, slogans, etc.
 * @property {Competitor[]} [competitors] - List of competitors
 * @property {ConfidenceScore} confidence - Confidence score
 */

/**
 * @typedef {Object} CampaignFeedback
 * @property {string[]} strengths - List of campaign strengths
 * @property {string[]} weaknesses - List of campaign weaknesses
 * @property {string[]} suggestions - List of improvement suggestions
 */

/**
 * @typedef {Object} Campaign
 * @property {CampaignType} type - Type of campaign
 * @property {string} content - Campaign content
 * @property {number} rating - Campaign rating score
 * @property {CampaignFeedback} feedback - Campaign feedback
 */

/**
 * @typedef {Object} CampaignObject
 * @property {string} targetBusiness - Target business name
 * @property {string} userBusiness - User business name
 * @property {Campaign[]} campaigns - List of campaigns
 */

/**
 * @typedef {Object} BusinessDiscoveryOptions
 * @property {boolean} [findCompetitors=false] - Whether to find competitors
 * @property {boolean} [findBranding=false] - Whether to find branding information
 * @property {boolean} [deepSearch=false] - Whether to perform a deep search
 * @property {PointOfContact} [pointOfContact] - Point of contact
 */

/**
 * @typedef {Object} BusinessCompatibilityScore
 * @property {string} targetBusiness - Target business name
 * @property {string} userBusiness - User business name
 * @property {number} score - Compatibility score
 * @property {Object} reasoning - Reasoning behind the score
 * @property {string[]} reasoning.positives - Positive reasons
 * @property {string[]} reasoning.negatives - Negative reasons
 * @property {string[]} reasoning.recommendations - Recommendations
 */

// Export empty object since these are just JSDoc type definitions
module.exports = {}; 