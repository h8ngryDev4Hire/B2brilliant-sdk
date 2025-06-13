"""
Basic usage example for the B2B Campaign Agent Python SDK
"""

import sys
import os

# Add parent directory to sys.path for local development
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# In production, you would import like this:
# from b2brilliant_sdk import B2BrilliantAgent, ApiError

# For development/testing, import from local path
from b2brilliant_sdk import B2BrilliantAgent, ApiError

# Initialize with your API key
agent = B2BrilliantAgent(api_key="your-api-key-here")

USER_BUSINESS = "https://themediamasons.com"
TARGET_BUSINESS = "https://tunipoints.com"

def run_example():
    """Run the example"""
    try:
        print("Discovering user business information...")
        print(f"Calling endpoint: {agent.api_client.base_url}/api/v1/user/discover")
        print(f"With API key: {agent.api_client.api_key}")
        user_business = agent.user.discover(
            [USER_BUSINESS],
            {
                "find_competitors": True,  # Optional: find competitors
                "find_branding": True      # Optional: find branding information
            }
        )
        print(f"✅ User business discovered: {user_business['profile']['name']}")

        print("\nDiscovering target business information...")
        target_business = agent.business.discover(
            [TARGET_BUSINESS]
        )
        print(f"✅ Target business discovered: {target_business['profile']['name']}")

        print("\nChecking business compatibility...")
        compatibility = agent.business.compatibility(user_business, target_business)
        print(f"✅ Compatibility score: {compatibility['score']}/10")
        print("Positives:", compatibility["reasoning"]["positives"])

        print("\nGenerating campaigns...")
        campaigns = agent.campaigns.create(user_business, target_business, "email")
        print(f"✅ Generated {len(campaigns['campaigns'])} campaigns")
        
        # Display the email campaign content
        email_campaign = next((c for c in campaigns["campaigns"] if c["type"] == "email"), None)
        if email_campaign:
            print("\nEmail Campaign:")
            print("-------------------------------------------")
            print(email_campaign["content"])
            print("-------------------------------------------")
            print(f"Rating: {email_campaign['rating']}/10")

        print("\nRefining the campaign with feedback...")
        refined_campaigns = agent.campaigns.refine(
            user_business,
            target_business,
            campaigns,
            "Make the tone more casual and human while remaining authoritative."
        )
        print("✅ Campaign refined")

        # Display the refined email campaign content
        refined_email_campaign = next((c for c in refined_campaigns["campaigns"] if c["type"] == "email"), None)
        if refined_email_campaign:
            print("\nRefined Email Campaign:")
            print("-------------------------------------------")
            print(refined_email_campaign["content"])
            print("-------------------------------------------")
            print(f"Rating: {refined_email_campaign['rating']}/10")

    except ApiError as e:
        print(f"API Error ({e.status}): {e.message}")
        print("Details:", e.data)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    run_example()
    print("Example completed") 
