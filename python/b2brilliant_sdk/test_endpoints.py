"""
Tests for API endpoints in the B2B Campaign Agent SDK
"""

import pytest
from .endpoints import USER_ENDPOINTS, BUSINESS_ENDPOINTS, CAMPAIGN_ENDPOINTS


class TestUserEndpoints:
    """Test cases for USER_ENDPOINTS"""
    
    def test_discover_endpoint(self):
        """Test that DISCOVER endpoint is correct"""
        assert USER_ENDPOINTS["DISCOVER"] == "/api/v1/user/discover"
    
    def test_refine_endpoint(self):
        """Test that REFINE endpoint is correct"""
        assert USER_ENDPOINTS["REFINE"] == "/api/v1/user/refine"
    
    def test_all_required_endpoints_present(self):
        """Test that all required endpoints are present"""
        expected_keys = ["DISCOVER", "REFINE"]
        actual_keys = list(USER_ENDPOINTS.keys())
        
        assert sorted(actual_keys) == sorted(expected_keys)
        assert len(actual_keys) == len(expected_keys)
    
    def test_endpoints_are_strings(self):
        """Test that all endpoint values are strings"""
        for endpoint in USER_ENDPOINTS.values():
            assert isinstance(endpoint, str)


class TestBusinessEndpoints:
    """Test cases for BUSINESS_ENDPOINTS"""
    
    def test_discover_endpoint(self):
        """Test that DISCOVER endpoint is correct"""
        assert BUSINESS_ENDPOINTS["DISCOVER"] == "/api/v1/business/discover"
    
    def test_refine_endpoint(self):
        """Test that REFINE endpoint is correct"""
        assert BUSINESS_ENDPOINTS["REFINE"] == "/api/v1/business/refine"
    
    def test_compatibility_endpoint(self):
        """Test that COMPATIBILITY endpoint is correct"""
        assert BUSINESS_ENDPOINTS["COMPATIBILITY"] == "/api/v1/business/compatibility"
    
    def test_all_required_endpoints_present(self):
        """Test that all required endpoints are present"""
        expected_keys = ["DISCOVER", "REFINE", "COMPATIBILITY"]
        actual_keys = list(BUSINESS_ENDPOINTS.keys())
        
        assert sorted(actual_keys) == sorted(expected_keys)
        assert len(actual_keys) == len(expected_keys)
    
    def test_endpoints_are_strings(self):
        """Test that all endpoint values are strings"""
        for endpoint in BUSINESS_ENDPOINTS.values():
            assert isinstance(endpoint, str)


class TestCampaignEndpoints:
    """Test cases for CAMPAIGN_ENDPOINTS"""
    
    def test_create_endpoint(self):
        """Test that CREATE endpoint is correct"""
        assert CAMPAIGN_ENDPOINTS["CREATE"] == "/api/v1/campaigns/create"
    
    def test_refine_endpoint(self):
        """Test that REFINE endpoint is correct"""
        assert CAMPAIGN_ENDPOINTS["REFINE"] == "/api/v1/campaigns/refine"
    
    def test_all_required_endpoints_present(self):
        """Test that all required endpoints are present"""
        expected_keys = ["CREATE", "REFINE"]
        actual_keys = list(CAMPAIGN_ENDPOINTS.keys())
        
        assert sorted(actual_keys) == sorted(expected_keys)
        assert len(actual_keys) == len(expected_keys)
    
    def test_endpoints_are_strings(self):
        """Test that all endpoint values are strings"""
        for endpoint in CAMPAIGN_ENDPOINTS.values():
            assert isinstance(endpoint, str)


class TestAllEndpoints:
    """Test cases for all endpoints collectively"""
    
    def test_api_versioning_pattern(self):
        """Test that all endpoints follow consistent API versioning pattern"""
        all_endpoints = (
            list(USER_ENDPOINTS.values()) +
            list(BUSINESS_ENDPOINTS.values()) +
            list(CAMPAIGN_ENDPOINTS.values())
        )
        
        for endpoint in all_endpoints:
            assert endpoint.startswith("/api/v1/")
    
    def test_unique_endpoints(self):
        """Test that all endpoints are unique"""
        all_endpoints = (
            list(USER_ENDPOINTS.values()) +
            list(BUSINESS_ENDPOINTS.values()) +
            list(CAMPAIGN_ENDPOINTS.values())
        )
        
        unique_endpoints = set(all_endpoints)
        assert len(unique_endpoints) == len(all_endpoints)
    
    def test_naming_conventions(self):
        """Test that endpoints use consistent naming conventions"""
        all_endpoints = (
            list(USER_ENDPOINTS.values()) +
            list(BUSINESS_ENDPOINTS.values()) +
            list(CAMPAIGN_ENDPOINTS.values())
        )
        
        for endpoint in all_endpoints:
            # Should use lowercase and forward slashes
            assert endpoint.islower() or any(c.isdigit() or c in "/-" for c in endpoint)
            # Should not end with slash
            assert not endpoint.endswith("/")
    
    def test_endpoint_structure(self):
        """Test that endpoints have expected structure"""
        all_endpoints = (
            list(USER_ENDPOINTS.values()) +
            list(BUSINESS_ENDPOINTS.values()) +
            list(CAMPAIGN_ENDPOINTS.values())
        )
        
        for endpoint in all_endpoints:
            parts = endpoint.split("/")
            # Should have at least 4 parts: ['', 'api', 'v1', 'resource']
            assert len(parts) >= 4
            assert parts[1] == "api"
            assert parts[2] == "v1" 