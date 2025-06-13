"""
Tests for ApiClient in the B2B Campaign Agent SDK
"""

import pytest
import requests
from .api_client import ApiClient
from .exceptions import ApiError


class TestApiClient:
    """Test cases for ApiClient class"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.api_client = ApiClient(
            api_key="test-api-key",
            base_url="https://api.test.com"
        )
    
    def test_constructor(self):
        """Test ApiClient initialization"""
        assert self.api_client.api_key == "test-api-key"
        assert self.api_client.base_url == "https://api.test.com"
    
    def test_successful_post_request(self, requests_mock):
        """Test successful POST request"""
        mock_response = {"success": True, "data": "test"}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=mock_response
        )
        
        result = self.api_client.post("/test-endpoint", {"test": "data"})
        
        # Verify request was made correctly
        assert requests_mock.called
        assert requests_mock.call_count == 1
        
        # Check request details
        request = requests_mock.request_history[0]
        assert request.method == "POST"
        assert request.url == "https://api.test.com/test-endpoint"
        assert request.json() == {"test": "data"}
        
        # Check headers
        assert request.headers["x-api-key"] == "test-api-key"
        assert request.headers["Accept-Encoding"] == "deflate"
        assert request.headers["Content-Type"] == "application/json"
        
        # Check response
        assert result == mock_response
    
    def test_post_request_with_empty_data(self, requests_mock):
        """Test POST request with no data provided"""
        mock_response = {"success": True}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=mock_response
        )
        
        result = self.api_client.post("/test-endpoint")
        
        # Check that empty dict was sent
        request = requests_mock.request_history[0]
        assert request.json() == {}
        assert result == mock_response
    
    def test_post_request_with_none_data(self, requests_mock):
        """Test POST request with None data"""
        mock_response = {"success": True}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=mock_response
        )
        
        result = self.api_client.post("/test-endpoint", None)
        
        # Check that empty dict was sent
        request = requests_mock.request_history[0]
        assert request.json() == {}
        assert result == mock_response
    
    def test_api_error_with_json_response(self, requests_mock):
        """Test handling API error with JSON response"""
        error_data = {"message": "Bad Request", "code": "INVALID_INPUT"}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=error_data,
            status_code=400
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert error.message == "Bad Request"
        assert error.status == 400
        assert error.data == error_data
    
    def test_api_error_without_json_response(self, requests_mock):
        """Test handling API error without JSON response"""
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            text="Internal Server Error",
            status_code=500
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert error.message == "HTTP error 500"
        assert error.status == 500
        assert error.data == {}
    
    def test_network_error(self, requests_mock):
        """Test handling network errors"""
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            exc=requests.ConnectionError("Network error")
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert "Network error" in error.message
        assert error.status == 0
        assert "original_error" in error.data
    
    def test_timeout_error(self, requests_mock):
        """Test handling timeout errors"""
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            exc=requests.Timeout("Request timeout")
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert "Request timeout" in error.message
        assert error.status == 0
    
    def test_url_construction(self, requests_mock):
        """Test URL construction with different endpoints"""
        requests_mock.post("https://api.test.com/api/v1/test", json={})
        requests_mock.post("https://api.test.com/user/discover", json={})
        requests_mock.post("https://api.test.com/business/refine", json={})
        
        # Test various endpoint formats
        endpoints = [
            "/api/v1/test",
            "/user/discover",
            "/business/refine"
        ]
        
        for i, endpoint in enumerate(endpoints):
            self.api_client.post(endpoint)
            
            # Check the request
            request = requests_mock.request_history[i]
            expected_url = f"https://api.test.com{endpoint}"
            assert request.url == expected_url
    
    def test_headers_included(self, requests_mock):
        """Test that all required headers are included"""
        requests_mock.post("https://api.test.com/test", json={})
        
        self.api_client.post("/test")
        
        request = requests_mock.request_history[0]
        headers = request.headers
        
        assert headers["x-api-key"] == "test-api-key"
        assert headers["Accept-Encoding"] == "deflate"
        assert headers["Content-Type"] == "application/json"
    
    def test_json_decode_error_on_success(self, requests_mock):
        """Test handling JSON decode error on successful response"""
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            text="invalid json",
            status_code=200
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        # Should wrap the JSON decode error
        error = exc_info.value
        assert error.status == 0
        assert "original_error" in error.data
    
    def test_error_with_message_in_response(self, requests_mock):
        """Test API error when response contains message field"""
        error_data = {"message": "Custom error message", "details": "More info"}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=error_data,
            status_code=422
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert error.message == "Custom error message"
        assert error.status == 422
        assert error.data == error_data
    
    def test_error_without_message_in_response(self, requests_mock):
        """Test API error when response doesn't contain message field"""
        error_data = {"code": "VALIDATION_ERROR", "details": "Field validation failed"}
        requests_mock.post(
            "https://api.test.com/test-endpoint",
            json=error_data,
            status_code=400
        )
        
        with pytest.raises(ApiError) as exc_info:
            self.api_client.post("/test-endpoint")
        
        error = exc_info.value
        assert error.message == "HTTP error 400"
        assert error.status == 400
        assert error.data == error_data 