"""
Campaign service for interacting with campaign API endpoints
"""

from .endpoints import CAMPAIGN_ENDPOINTS
from .exceptions import ValidationError


class CampaignService:
    """Service for campaign operations"""
    
    VALID_CAMPAIGN_TYPES = ["email", "dm", "sms"]
    
    def __init__(self, api_client):
        """
        Initialize the campaign service
        
        Args:
            api_client: API client for making requests
        """
        self.api_client = api_client
        
    def create(self, user_business, target_business, campaign_types=None):
        """
        Create campaigns
        
        Args:
            user_business (dict): User business data
            target_business (dict): Target business data
            campaign_types (list or str, optional): Types of campaigns to create
                Valid values: "email", "dm", "sms"
                
        Returns:
            dict: Campaign data
            
        Raises:
            ValidationError: If the input is invalid
            ApiError: If the API request fails
        """
        if not user_business or not isinstance(user_business, dict):
            raise ValidationError(
                "user_business must be a dictionary", 
                {"user_business": "Must be a dictionary"}
            )
            
        if not target_business or not isinstance(target_business, dict):
            raise ValidationError(
                "target_business must be a dictionary", 
                {"target_business": "Must be a dictionary"}
            )
            
        # Validate campaign types
        payload = {
            "userBusiness": user_business,
            "targetBusiness": target_business
        }
        
        if campaign_types:
            # Handle single campaign type as string
            if isinstance(campaign_types, str):
                campaign_types = [campaign_types]
                
            if not isinstance(campaign_types, list):
                raise ValidationError(
                    "campaign_types must be a list or string", 
                    {"campaign_types": "Must be a list or string"}
                )
                
            # Validate each campaign type
            for campaign_type in campaign_types:
                if campaign_type not in self.VALID_CAMPAIGN_TYPES:
                    raise ValidationError(
                        f"Invalid campaign type: {campaign_type}", 
                        {"campaign_types": f"Contains invalid type: {campaign_type}"}
                    )
                    
            payload["campaignTypes"] = campaign_types
            
        return self.api_client.post(
            CAMPAIGN_ENDPOINTS["CREATE"],
            payload
        )
        
    def refine(self, user_business, target_business, campaigns, feedback):
        """
        Refine campaigns with feedback
        
        Args:
            user_business (dict): User business data
            target_business (dict): Target business data
            campaigns (dict): Campaign data
            feedback (str): Feedback for refinement
            
        Returns:
            dict: Refined campaign data
            
        Raises:
            ValidationError: If the input is invalid
            ApiError: If the API request fails
        """
        if not user_business or not isinstance(user_business, dict):
            raise ValidationError(
                "user_business must be a dictionary", 
                {"user_business": "Must be a dictionary"}
            )
            
        if not target_business or not isinstance(target_business, dict):
            raise ValidationError(
                "target_business must be a dictionary", 
                {"target_business": "Must be a dictionary"}
            )
            
        if not campaigns or not isinstance(campaigns, dict):
            raise ValidationError(
                "campaigns must be a dictionary", 
                {"campaigns": "Must be a dictionary"}
            )
            
        if not feedback or not isinstance(feedback, str):
            raise ValidationError(
                "feedback must be a non-empty string", 
                {"feedback": "Must be a non-empty string"}
            )
            
        return self.api_client.post(
            CAMPAIGN_ENDPOINTS["REFINE"],
            {
                "userBusiness": user_business,
                "targetBusiness": target_business,
                "campaign": campaigns,
                "feedback": feedback
            }
        ) 
