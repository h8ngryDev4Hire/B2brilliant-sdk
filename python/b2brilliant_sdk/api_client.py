"""
API Client for making HTTP requests to the B2B Campaign Agent API
"""

import json
import requests
from .exceptions import ApiError


class ApiClient:
    """API Client for the B2B Campaign Agent API"""
    
    def __init__(self, api_key, base_url):
        """
        Create a new API client
        
        Args:
            api_key (str): API key for authentication
            base_url (str): Base URL for the API
        """
        self.api_key = api_key
        self.base_url = base_url
        
    def post(self, endpoint, data=None):
        """
        Make a POST request to the API
        
        Args:
            endpoint (str): API endpoint
            data (dict, optional): Request body
            
        Returns:
            dict: Response data
            
        Raises:
            ApiError: If the API request fails
        """
        url = f"{self.base_url}{endpoint}"
        headers = {
            "x-api-key": self.api_key,
            "Accept-Encoding": "deflate",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.post(
                url, 
                headers=headers,
                json=data or {}
            )
            
            if not response.ok:
                try:
                    error_data = response.json()
                except (ValueError, json.JSONDecodeError):
                    error_data = {}
                    
                raise ApiError(
                    error_data.get("message") or f"HTTP error {response.status_code}",
                    response.status_code,
                    error_data
                )
                
            return response.json()
            
        except requests.RequestException as e:
            raise ApiError(
                str(e) or "Network error",
                0,
                {"original_error": str(e)}
            ) 