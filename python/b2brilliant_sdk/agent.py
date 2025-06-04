"""
Main B2Brilliant Agent class for the B2B Campaign Agent SDK
"""

from .api_client import ApiClient
from .user import UserService
from .business import BusinessService
from .campaigns import CampaignService


class B2BrilliantAgent:
    """Main client for the B2B Campaign Agent API"""
    
    DEFAULT_BASE_URL = "https://api.b2brilliant.app"
    
    def __init__(self, api_key, base_url=None):
        """
        Initialize a new B2Brilliant Agent
        
        Args:
            api_key (str): API key for authentication
            base_url (str, optional): Base URL for the API
        """
        self.api_client = ApiClient(
            api_key=api_key,
            base_url=base_url or self.DEFAULT_BASE_URL
        )
        
        # Initialize services
        self.user = UserService(self.api_client)
        self.business = BusinessService(self.api_client)
        self.campaigns = CampaignService(self.api_client) 