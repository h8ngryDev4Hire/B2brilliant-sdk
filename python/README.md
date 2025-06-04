# B2B Campaign Agent Python SDK

A Python client for the B2B Campaign Agent API that helps you generate personalized B2B campaigns by analyzing business websites and social media profiles.

## Want to Join The Beta?

Visit [here](https://b2brilliant.app) to register for beta access!

## Installation

```bash
pip install b2brilliant-sdk
```

## Basic Usage

```python
from b2brilliant_sdk import B2BrilliantAgent

# Initialize with your API key
agent = B2BrilliantAgent(api_key="your-api-key")

# Discover information about your business
user_business = agent.user.discover([
    "https://yourbusiness.com"
])

# Discover information about a target business
target_business = agent.business.discover([
    "https://targetbusiness.com"
])

# Generate campaigns (email, DM, SMS)
campaigns = agent.campaigns.create(
    user_business,
    target_business,
    ["email", "dm", "sms"]
)

# Use the generated campaigns
print(campaigns)
```

## API Reference

### Initialization

```python
from b2brilliant_sdk import B2BrilliantAgent

agent = B2BrilliantAgent(api_key="your-api-key")
```

### User Business Methods

#### Discover User Business Information

```python
options = {
    "find_competitors": True,
    "find_branding": True,
    "deep_search": False
}

user_business = agent.user.discover(
    ["https://yourbusiness.com", "https://yourbusiness.com/about"],
    options
)
```

#### Refine User Business Information

```python
refined_business = agent.user.refine(
    user_business, 
    "We recently launched a new service called 'Advanced Analytics'"
)
```

### Target Business Methods

#### Discover Target Business Information

```python
target_business = agent.business.discover(
    ["https://targetbusiness.com"],
    {"find_branding": True}
)
```

#### Refine Target Business Information

```python
refined_target = agent.business.refine(
    target_business,
    "They recently announced a Series B funding round"
)
```

#### Assess Business Compatibility

```python
compatibility = agent.business.compatibility(
    user_business,
    target_business
)

print(f"Compatibility score: {compatibility['score']}")
print("Positives:", compatibility["reasoning"]["positives"])
print("Negatives:", compatibility["reasoning"]["negatives"])
print("Recommendations:", compatibility["reasoning"]["recommendations"])
```

### Campaign Methods

#### Create Campaign

```python
# Generate all campaign types
all_campaigns = agent.campaigns.create(
    user_business,
    target_business
)

# Generate only specific campaign types
campaign_types = ["email", "dm"]
specific_campaigns = agent.campaigns.create(
    user_business,
    target_business,
    campaign_types
)
```

#### Refine Campaign

```python
refined_campaigns = agent.campaigns.refine(
    user_business,
    target_business,
    all_campaigns,
    "Make the tone more professional and focus on their recent funding"
)
```

## Error Handling

The SDK raises typed exceptions that can be caught and handled:

```python
from b2brilliant_sdk.exceptions import ApiError, ValidationError

try:
    campaigns = agent.campaigns.create(user_business, target_business)
except ApiError as e:
    print(f"API error ({e.status}): {e.message}")
    print("Error data:", e.data)
except ValidationError as e:
    print("Validation error:", e.validation_errors)
except Exception as e:
    print("Unexpected error:", e)
```

## Data Structures

The SDK works with the following key data structures:

### BusinessObject

```python
{
    "profile": {
        "name": str,
        "summary": str,
        "services": List[str],
        "current_events": str,
        "target_audience": str,
        "industry": str
    },
    "contacts": {
        "point_of_contact": {  # Optional
            "name": str,
            "position": str
        },
        "social": List[Dict],  # List of social channels
        "email": str,
        "phone": str
    },
    "branding": {
        "voice": str,
        "tone": str,
        "style": str,
        "phrases": List[str]
    },
    "competitors": List[Dict],  # Optional
    "confidence": {
        "score": float,  # 0-10
        "reasoning": str
    }
}
```

### CampaignObject

```python
{
    "target_business": str,
    "user_business": str,
    "campaigns": [
        {
            "type": str,  # "dm", "email", or "sms"
            "content": str,
            "rating": float,
            "feedback": {
                "strengths": List[str],
                "weaknesses": List[str],
                "suggestions": List[str]
            }
        }
    ]
}
```

### BusinessCompatibilityScore

```python
{
    "target_business": str,
    "user_business": str,
    "score": float,
    "reasoning": {
        "positives": List[str],
        "negatives": List[str],
        "recommendations": List[str]
    }
}
```

## License

This software is licensed under the Business Source License 1.1 (BSL). 