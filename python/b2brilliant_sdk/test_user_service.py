"""
Tests for UserService in the B2B Campaign Agent SDK
"""

import pytest
from unittest.mock import Mock
from .user import UserService
from .exceptions import ValidationError


class TestUserService:
    """Test cases for UserService class"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.mock_api_client = Mock()
        self.user_service = UserService(self.mock_api_client)
    
    def test_constructor(self):
        """Test UserService initialization"""
        assert self.user_service.api_client == self.mock_api_client
    
    def test_discover_with_urls_only(self):
        """Test discover method with URLs only"""
        mock_response = {"name": "Test Business", "industry": "Tech"}
        self.mock_api_client.post.return_value = mock_response
        
        result = self.user_service.discover(["https://example.com"])
        
        # Verify API call
        self.mock_api_client.post.assert_called_once_with(
            "/api/v1/user/discover",
            {"urls": ["https://example.com"]}
        )
        assert result == mock_response
    
    def test_discover_with_options(self):
        """Test discover method with options"""
        mock_response = {"name": "Test Business", "industry": "Tech"}
        self.mock_api_client.post.return_value = mock_response
        
        options = {
            "find_competitors": True,
            "find_branding": False,
            "deep_search": True
        }
        
        result = self.user_service.discover(["https://example.com"], options)
        
        # Verify API call with transformed options
        expected_payload = {
            "urls": ["https://example.com"],
            "findCompetitors": True,
            "findBranding": False,
            "deepSearch": True
        }
        self.mock_api_client.post.assert_called_once_with(
            "/api/v1/user/discover",
            expected_payload
        )
        assert result == mock_response
    
    def test_discover_with_point_of_contact(self):
        """Test discover method with point of contact"""
        mock_response = {"name": "Test Business", "industry": "Tech"}
        self.mock_api_client.post.return_value = mock_response
        
        options = {
            "point_of_contact": {
                "name": "John Doe",
                "position": "CEO"
            }
        }
        
        result = self.user_service.discover(["https://example.com"], options)
        
        # Verify API call
        expected_payload = {
            "urls": ["https://example.com"],
            "pointOfContact": {
                "name": "John Doe",
                "position": "CEO"
            }
        }
        self.mock_api_client.post.assert_called_once_with(
            "/api/v1/user/discover",
            expected_payload
        )
        assert result == mock_response
    
    def test_discover_empty_urls_raises_validation_error(self):
        """Test discover with empty URLs raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.discover([])
        
        error = exc_info.value
        assert "URLs must be a non-empty list" in error.message
        assert "urls" in error.validation_errors
    
    def test_discover_non_list_urls_raises_validation_error(self):
        """Test discover with non-list URLs raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.discover("https://example.com")
        
        error = exc_info.value
        assert "URLs must be a non-empty list" in error.message
        assert "urls" in error.validation_errors
    
    def test_discover_none_urls_raises_validation_error(self):
        """Test discover with None URLs raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.discover(None)
        
        error = exc_info.value
        assert "URLs must be a non-empty list" in error.message
        assert "urls" in error.validation_errors
    
    def test_discover_invalid_point_of_contact_raises_validation_error(self):
        """Test discover with invalid point of contact raises ValidationError"""
        options = {
            "point_of_contact": "invalid"  # Should be dict, not string
        }
        
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.discover(["https://example.com"], options)
        
        error = exc_info.value
        assert "point_of_contact must be a dictionary" in error.message
        assert "point_of_contact" in error.validation_errors
    
    def test_refine_success(self):
        """Test refine method success"""
        mock_response = {"name": "Refined Business", "industry": "Tech"}
        self.mock_api_client.post.return_value = mock_response
        
        business_data = {"name": "Test Business", "industry": "Tech"}
        additional_info = "Additional information"
        
        result = self.user_service.refine(business_data, additional_info)
        
        # Verify API call
        self.mock_api_client.post.assert_called_once_with(
            "/api/v1/user/refine",
            {
                "businessData": business_data,
                "additionalInfo": additional_info
            }
        )
        assert result == mock_response
    
    def test_refine_invalid_business_data_raises_validation_error(self):
        """Test refine with invalid business data raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.refine(None, "Additional info")
        
        error = exc_info.value
        assert "business_data must be a dictionary" in error.message
        assert "business_data" in error.validation_errors
    
    def test_refine_empty_business_data_raises_validation_error(self):
        """Test refine with empty business data raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.refine({}, "Additional info")
        
        error = exc_info.value
        assert "business_data must be a dictionary" in error.message
        assert "business_data" in error.validation_errors
    
    def test_refine_non_dict_business_data_raises_validation_error(self):
        """Test refine with non-dict business data raises ValidationError"""
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.refine("invalid", "Additional info")
        
        error = exc_info.value
        assert "business_data must be a dictionary" in error.message
        assert "business_data" in error.validation_errors
    
    def test_refine_invalid_additional_info_raises_validation_error(self):
        """Test refine with invalid additional info raises ValidationError"""
        business_data = {"name": "Test Business"}
        
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.refine(business_data, None)
        
        error = exc_info.value
        assert "additional_info must be a non-empty string" in error.message
        assert "additional_info" in error.validation_errors
    
    def test_refine_empty_additional_info_raises_validation_error(self):
        """Test refine with empty additional info raises ValidationError"""
        business_data = {"name": "Test Business"}
        
        with pytest.raises(ValidationError) as exc_info:
            self.user_service.refine(business_data, "")
        
        error = exc_info.value
        assert "additional_info must be a non-empty string" in error.message
        assert "additional_info" in error.validation_errors 