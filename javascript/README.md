# B2B Campaign Agent JavaScript SDK

A JavaScript client for the B2B Campaign Agent API that helps you generate personalized B2B campaigns by analyzing business websites and social media profiles.

## Installation

```bash
npm install b2brilliant-sdk
```

## Basic Usage

```javascript
const Agent = require('b2brilliant-sdk');

// Initialize with your API key
const agent = new Agent({
  apiKey: 'your-api-key',
  // Optional: baseUrl: 'https://custom-api-url.com'
});

async function run() {
  try {
    // Discover information about your business
    const userBusiness = await agent.user.discover([
      'https://yourbusiness.com'
    ]);

    // Discover information about a target business
    const targetBusiness = await agent.business.discover([
      'https://targetbusiness.com'
    ]);

    // Generate campaigns (email, DM, SMS)
    const campaigns = await agent.campaigns.create(
      userBusiness,
      targetBusiness,
      ['email', 'dm', 'sms']
    );

    // Use the generated campaigns
    console.log(campaigns);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
```

## API Reference

### Initialization

```javascript
const agent = new Agent({
  apiKey: 'your-api-key',             // Required - used in x-api-key header
  baseUrl: 'https://api.example.com'  // Optional, defaults to https://b2brilliant.app
});
```

### User Business Methods

#### Discover User Business Information

```javascript
const userBusiness = await agent.user.discover(
  ['https://yourbusiness.com', 'https://yourbusiness.com/about'],
  { findCompetitors: true } // Optional options
);
```

#### Refine User Business Information

```javascript
const refinedBusiness = await agent.user.refine(
  userBusiness, 
  "We recently launched a new service called 'Advanced Analytics'"
);
```

### Target Business Methods

#### Discover Target Business Information

```javascript
const targetBusiness = await agent.business.discover(
  ['https://targetbusiness.com'],
  { findBranding: true } // Optional options
);
```

#### Refine Target Business Information

```javascript
const refinedTarget = await agent.business.refine(
  targetBusiness,
  "They recently announced a Series B funding round"
);
```

#### Assess Business Compatibility

```javascript
const compatibility = await agent.business.compatibility(
  userBusiness,
  targetBusiness
);

console.log(`Compatibility score: ${compatibility.score}`);
console.log('Positives:', compatibility.reasoning.positives);
```

### Campaign Methods

#### Create Campaign

```javascript
// Generate all campaign types
const allCampaigns = await agent.campaigns.create(
  userBusiness,
  targetBusiness
);

// Generate only email campaigns
const emailCampaigns = await agent.campaigns.create(
  userBusiness,
  targetBusiness,
  ['email']
);
```

#### Refine Campaign

```javascript
const refinedCampaigns = await agent.campaigns.refine(
  userBusiness,
  targetBusiness,
  campaign,
  "Make the tone more professional and focus on their recent funding"
);
```

## Error Handling

The SDK throws typed errors that can be caught and handled:

```javascript
try {
  const campaigns = await agent.campaigns.create(userBusiness, targetBusiness);
} catch (error) {
  if (error.name === 'ApiError') {
    console.error(`API error (${error.status}):`, error.message);
  } else if (error.name === 'ValidationError') {
    console.error('Validation error:', error.validationErrors);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Data Types

The SDK uses the following types to match the B2B Campaign Agent API:

```javascript
/**
 * Business Object - Main business data structure
 * 
 * @typedef {Object} BusinessObject
 * @property {Object} profile - Business profile information
 * @property {string} profile.name - Name of the business
 * @property {string} profile.summary - Brief description
 * @property {string[]} profile.services - List of services offered
 * @property {string} profile.currentEvents - Current activities
 * @property {string} profile.targetAudience - Target audience
 * @property {string} profile.industry - Industry name
 * @property {Object} contacts - Contact information
 * @property {BusinessChannels[]} contacts.social - Social media channels
 * // ... and more fields
 */

/**
 * Campaign Object - Contains all campaign data
 * 
 * @typedef {Object} CampaignObject
 * @property {string} targetBusiness - Target business name
 * @property {string} userBusiness - User business name
 * @property {Campaign[]} campaigns - List of campaigns
 */
```

## License

This software is licensed under the Business Source License 1.1 (BSL). 