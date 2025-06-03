# B2B Campaign Agent TypeScript SDK

A TypeScript client for the B2B Campaign Agent API that helps you generate personalized B2B campaigns by analyzing business websites and social media profiles.

## Want to Join The Beta?

Visit [here](https://b2brilliant.app) to register for beta access!

## Installation

```bash
npm install b2brilliant-sdk
```

## Basic Usage

```typescript
import { B2BrilliantAgent } from 'b2brilliant-sdk';
// or: import B2BrilliantAgent from 'b2brilliant-sdk';

// Initialize with your API key
const agent = new B2BrilliantAgent({
  apiKey: 'your-api-key',
});

async function run(): Promise<void> {
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

```typescript
import { B2BrilliantAgent } from 'b2brilliant-sdk';

const agent = new B2BrilliantAgent({
  apiKey: 'your-api-key'             // Required 
});
```

### User Business Methods

#### Discover User Business Information

```typescript
import type { BusinessObject, BusinessDiscoveryOptions } from 'b2brilliant-sdk';

const options: BusinessDiscoveryOptions = {
  findCompetitors: true,
  findBranding: true,
  deepSearch: false
};

const userBusiness: BusinessObject = await agent.user.discover(
  ['https://yourbusiness.com', 'https://yourbusiness.com/about'],
  options
);
```

#### Refine User Business Information

```typescript
const refinedBusiness: BusinessObject = await agent.user.refine(
  userBusiness, 
  "We recently launched a new service called 'Advanced Analytics'"
);
```

### Target Business Methods

#### Discover Target Business Information

```typescript
const targetBusiness: BusinessObject = await agent.business.discover(
  ['https://targetbusiness.com'],
  { findBranding: true }
);
```

#### Refine Target Business Information

```typescript
const refinedTarget: BusinessObject = await agent.business.refine(
  targetBusiness,
  "They recently announced a Series B funding round"
);
```

#### Assess Business Compatibility

```typescript
import type { BusinessCompatibilityScore } from 'b2brilliant-sdk';

const compatibility: BusinessCompatibilityScore = await agent.business.compatibility(
  userBusiness,
  targetBusiness
);

console.log(`Compatibility score: ${compatibility.score}`);
console.log('Positives:', compatibility.reasoning.positives);
console.log('Negatives:', compatibility.reasoning.negatives);
console.log('Recommendations:', compatibility.reasoning.recommendations);
```

### Campaign Methods

#### Create Campaign

```typescript
import type { CampaignObject, CampaignType } from 'b2brilliant-sdk';

// Generate all campaign types
const allCampaigns: CampaignObject = await agent.campaigns.create(
  userBusiness,
  targetBusiness
);

// Generate only specific campaign types
const campaignTypes: CampaignType[] = ['email', 'dm'];
const specificCampaigns: CampaignObject = await agent.campaigns.create(
  userBusiness,
  targetBusiness,
  campaignTypes
);
```

#### Refine Campaign

```typescript
const refinedCampaigns: CampaignObject = await agent.campaigns.refine(
  userBusiness,
  targetBusiness,
  allCampaigns,
  "Make the tone more professional and focus on their recent funding"
);
```

## Error Handling

The SDK throws typed errors that can be caught and handled:

```typescript
import { ApiError, ValidationError } from 'b2brilliant-sdk';

try {
  const campaigns = await agent.campaigns.create(userBusiness, targetBusiness);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API error (${error.status}):`, error.message);
    console.error('Error data:', error.data);
  } else if (error instanceof ValidationError) {
    console.error('Validation error:', error.validationErrors);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Interfaces

The SDK provides full TypeScript support with the following key interfaces:

### BusinessObject

```typescript
interface BusinessObject {
  profile: {
    name: string;
    summary: string;
    services: string[];
    currentEvents: string;
    targetAudience: string;
    industry: string;
  };
  contacts: {
    pointOfContact?: {
      name: string;
      position: string;
    };
    social: BusinessChannels[];
    email: string;
    phone: string;
  };
  branding: {
    voice: string;
    tone: string;
    style: string;
    phrases: string[];
  };
  competitors?: Competitor[];
  confidence: {
    score: number; // 0-10
    reasoning: string;
  };
}
```

### CampaignObject

```typescript
interface CampaignObject {
  targetBusiness: string;
  userBusiness: string;
  campaigns: Campaign[];
}

interface Campaign {
  type: 'dm' | 'email' | 'sms';
  content: string;
  rating: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}
```

### BusinessCompatibilityScore

```typescript
interface BusinessCompatibilityScore {
  targetBusiness: string;
  userBusiness: string;
  score: number;
  reasoning: {
    positives: string[];
    negatives: string[];
    recommendations: string[];
  };
}
```

### Configuration Options

```typescript
interface BusinessDiscoveryOptions {
  findCompetitors?: boolean;
  findBranding?: boolean;
  deepSearch?: boolean;
  pointOfContact?: {
    name: string;
    position: string;
  };
}
```


## License

This software is licensed under the Business Source License 1.1 (BSL).
