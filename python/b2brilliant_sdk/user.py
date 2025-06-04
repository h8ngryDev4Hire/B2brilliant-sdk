"""
User service for interacting with user business API endpoints
"""

from .endpoints import USER_ENDPOINTS
from .exceptions import ValidationError


class UserService:
    """Service for user business operations"""
    
    def __init__(self, api_client):
        """
        Initialize the user service
        
        Args:
            api_client: API client for making requests
        """
        self.api_client = api_client
        
    def discover(self, urls, options=None):
        """
        Discover information about a user business
        
        Args:
            urls (list): List of URLs to analyze
            options (dict, optional): Discovery options
                - find_competitors (bool): Whether to find competitors
                - find_branding (bool): Whether to find branding information
                - deep_search (bool): Whether to perform a deep search
                - point_of_contact (dict): Point of contact information
                    - name (str): Name of the contact person
                    - position (str): Position or job title
                    
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
                if key == "find_competitors":
                    transformed_options["findCompetitors"] = value
                elif key == "find_branding":
                    transformed_options["findBranding"] = value
                elif key == "deep_search":
                    transformed_options["deepSearch"] = value
                elif key == "point_of_contact":
                    if isinstance(value, dict):
                        transformed_options["pointOfContact"] = value
                    else:
                        raise ValidationError(
                            "point_of_contact must be a dictionary", 
                            {"point_of_contact": "Must be a dictionary"}
                        )
                        
        return self.api_client.post(
            USER_ENDPOINTS["DISCOVER"],
            {
                "urls": urls,
                **transformed_options
            }
        )
        
    def refine(self, business_data, additional_info):
        """
        Refine information about a user business
        
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
            USER_ENDPOINTS["REFINE"],
            {
                "businessData": business_data,
                "additionalInfo": additional_info
            }
        ) 