"""
Tests for B2BrilliantAgent main SDK class
"""

import pytest
from unittest.mock import Mock, patch
from .agent import B2BrilliantAgent
from .api_client import ApiClient
from .user import UserService
from .business import BusinessService
from .campaigns import CampaignService


class TestB2BrilliantAgent:
    """Test cases for B2BrilliantAgent class"""
    
    def test_constructor_with_api_key_only(self):
        """Test agent initialization with API key only"""
        agent = B2BrilliantAgent(api_key="test-api-key")
        
        assert isinstance(agent, B2BrilliantAgent)
        assert agent.api_client.api_key == "test-api-key"
        assert agent.api_client.base_url == "https://api.b2brilliant.app"
        
        # Check that services are initialized
        assert isinstance(agent.user, UserService)
        assert isinstance(agent.business, BusinessService)
        assert isinstance(agent.campaigns, CampaignService)
    
    def test_constructor_with_custom_base_url(self):
        """Test agent initialization with custom base URL"""
        agent = B2BrilliantAgent(
            api_key="test-api-key",
            base_url="https://custom.api.com"
        )
        
        assert agent.api_client.api_key == "test-api-key"
        assert agent.api_client.base_url == "https://custom.api.com"
    
    def test_constructor_with_none_base_url(self):
        """Test agent initialization with None base URL uses default"""
        agent = B2BrilliantAgent(api_key="test-api-key", base_url=None)
        
        assert agent.api_client.base_url == "https://api.b2brilliant.app"
    
    def test_default_base_url_constant(self):
        """Test that DEFAULT_BASE_URL constant is correct"""
        assert B2BrilliantAgent.DEFAULT_BASE_URL == "https://api.b2brilliant.app"
    
    @patch('b2brilliant_sdk.agent.ApiClient')
    def test_api_client_initialization(self, mock_api_client):
        """Test that ApiClient is initialized correctly"""
        mock_client_instance = Mock()
        mock_api_client.return_value = mock_client_instance
        
        agent = B2BrilliantAgent(api_key="test-key", base_url="https://test.com")
        
        # Verify ApiClient was called with correct parameters
        mock_api_client.assert_called_once_with(
            api_key="test-key",
            base_url="https://test.com"
        )
        
        # Verify agent uses the mocked client
        assert agent.api_client == mock_client_instance
    
    @patch('b2brilliant_sdk.agent.UserService')
    @patch('b2brilliant_sdk.agent.BusinessService')
    @patch('b2brilliant_sdk.agent.CampaignService')
    def test_services_initialization(self, mock_campaign, mock_business, mock_user):
        """Test that all services are initialized with the API client"""
        mock_user_instance = Mock()
        mock_business_instance = Mock()
        mock_campaign_instance = Mock()
        
        mock_user.return_value = mock_user_instance
        mock_business.return_value = mock_business_instance
        mock_campaign.return_value = mock_campaign_instance
        
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Verify services were initialized with the API client
        mock_user.assert_called_once_with(agent.api_client)
        mock_business.assert_called_once_with(agent.api_client)
        mock_campaign.assert_called_once_with(agent.api_client)
        
        # Verify agent has the service instances
        assert agent.user == mock_user_instance
        assert agent.business == mock_business_instance
        assert agent.campaigns == mock_campaign_instance
    
    def test_user_service_integration(self):
        """Test integration with user service"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Mock the API client's post method
        agent.api_client.post = Mock(return_value={"success": True})
        
        # Test that user methods are available
        assert hasattr(agent.user, 'discover')
        assert hasattr(agent.user, 'refine')
        assert callable(agent.user.discover)
        assert callable(agent.user.refine)
    
    def test_business_service_integration(self):
        """Test integration with business service"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Mock the API client's post method
        agent.api_client.post = Mock(return_value={"success": True})
        
        # Test that business methods are available
        assert hasattr(agent.business, 'discover')
        assert hasattr(agent.business, 'refine')
        assert hasattr(agent.business, 'compatibility')
        assert callable(agent.business.discover)
        assert callable(agent.business.refine)
        assert callable(agent.business.compatibility)
    
    def test_campaigns_service_integration(self):
        """Test integration with campaigns service"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Mock the API client's post method
        agent.api_client.post = Mock(return_value={"success": True})
        
        # Test that campaigns methods are available
        assert hasattr(agent.campaigns, 'create')
        assert hasattr(agent.campaigns, 'refine')
        assert callable(agent.campaigns.create)
        assert callable(agent.campaigns.refine)
    
    def test_api_client_sharing(self):
        """Test that all services share the same API client instance"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # All services should use the same API client instance
        assert agent.user.api_client is agent.api_client
        assert agent.business.api_client is agent.api_client
        assert agent.campaigns.api_client is agent.api_client
    
    def test_agent_attributes(self):
        """Test that agent has all expected attributes"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Check that all expected attributes exist
        assert hasattr(agent, 'api_client')
        assert hasattr(agent, 'user')
        assert hasattr(agent, 'business')
        assert hasattr(agent, 'campaigns')
        
        # Check that they are not None
        assert agent.api_client is not None
        assert agent.user is not None
        assert agent.business is not None
        assert agent.campaigns is not None
    
    def test_end_to_end_workflow_simulation(self):
        """Test simulated end-to-end workflow"""
        agent = B2BrilliantAgent(api_key="test-key")
        
        # Mock API responses
        mock_business_data = {"name": "Test Business", "industry": "Tech"}
        mock_compatibility = {"score": 0.85, "reasoning": "Good match"}
        mock_campaigns = {"campaigns": [{"type": "email", "content": "Hello"}]}
        
        # Mock the API client
        agent.api_client.post = Mock()
        agent.api_client.post.side_effect = [
            mock_business_data,  # user.discover
            mock_business_data,  # business.discover
            mock_compatibility,  # business.compatibility
            mock_campaigns       # campaigns.create
        ]
        
        # Simulate workflow
        user_business = agent.user.discover(["https://user-company.com"])
        target_business = agent.business.discover(["https://target-company.com"])
        compatibility = agent.business.compatibility(user_business, target_business)
        campaigns = agent.campaigns.create(user_business, target_business)
        
        # Verify results
        assert user_business == mock_business_data
        assert target_business == mock_business_data
        assert compatibility == mock_compatibility
        assert campaigns == mock_campaigns
        
        # Verify API calls were made
        assert agent.api_client.post.call_count == 4 