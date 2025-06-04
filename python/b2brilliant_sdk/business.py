"""
Business service for interacting with target business API endpoints
"""

from .endpoints import BUSINESS_ENDPOINTS
from .exceptions import ValidationError


class BusinessService:
    """Service for target business operations"""
    
    def __init__(self, api_client):
        """
        Initialize the business service
        
        Args:
            api_client: API client for making requests
        """
        self.api_client = api_client
        
    def discover(self, urls, options=None):
        """
        Discover information about a target business
        
        Args:
            urls (list): List of URLs to analyze
            options (dict, optional): Discovery options
                - find_branding (bool): Whether to find branding information
                - deep_search (bool): Whether to perform a deep search
                    
        Returns:
            dict: Business information
            
        Raises:
            ValidationError: If the input is invalid
            ApiError: If the API request fails
        """
        if not urls or not isinstance(urls, list):
            raise ValidationError("URLs must be a non-empty list", {"urls": "Must be a non-empty list"})
            
        # Transform options from snake_case to camelCase
        transformed_options = {}
        if options:
            for key, value in options.items():
                if key == "find_branding":
                    transformed_options["findBranding"] = value
                elif key == "deep_search":
                    transformed_options["deepSearch"] = value
                        
        return self.api_client.post(
            BUSINESS_ENDPOINTS["DISCOVER"],
            {
                "urls": urls,
                **transformed_options
            }
        )
        
    def refine(self, business_data, additional_info):
        """
        Refine information about a target business
        
        Args:
            business_data (dict): Business data from discover
            additional_info (str): Additional information to refine with
            
        Returns:
            dict: Refined business information
            
        Raises:
            ValidationError: If the input is invalid
            ApiError: If the API request fails
        """
        if not business_data or not isinstance(business_data, dict):
            raise ValidationError(
                "business_data must be a dictionary", 
                {"business_data": "Must be a dictionary"}
            )
            
        if not additional_info or not isinstance(additional_info, str):
            raise ValidationError(
                "additional_info must be a non-empty string", 
                {"additional_info": "Must be a non-empty string"}
            )
            
        return self.api_client.post(
            BUSINESS_ENDPOINTS["REFINE"],
            {
                "businessData": business_data,
                "additionalInfo": additional_info
            }
        )
        
    def compatibility(self, user_business, target_business):
        """
        Assess compatibility between user business and target business
        
        Args:
            user_business (dict): User business data
            target_business (dict): Target business data
            
        Returns:
            dict: Compatibility assessment
            
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
            
        return self.api_client.post(
            BUSINESS_ENDPOINTS["COMPATIBILITY"],
            {
                "userBusiness": user_business,
                "targetBusiness": target_business
            }
        ) 