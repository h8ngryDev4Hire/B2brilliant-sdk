"""
Tests for custom exceptions in the B2B Campaign Agent SDK
"""

import pytest
from .exceptions import ApiError, ValidationError


class TestApiError:
    """Test cases for ApiError class"""
    
    def test_api_error_with_message_and_status(self):
        """Test ApiError creation with message and status"""
        error = ApiError("Test error", 400)
        
        assert isinstance(error, Exception)
        assert isinstance(error, ApiError)
        assert error.message == "Test error"
        assert error.status == 400
        assert error.data == {}
        assert str(error) == "Test error"
    
    def test_api_error_with_message_status_and_data(self):
        """Test ApiError creation with message, status, and data"""
        data = {"field": "Invalid value", "code": "VALIDATION_ERROR"}
        error = ApiError("Validation failed", 422, data)
        
        assert error.message == "Validation failed"
        assert error.status == 422
        assert error.data == data
    
    def test_api_error_with_none_data(self):
        """Test ApiError creation with None data defaults to empty dict"""
        error = ApiError("Test error", 500, None)
        
        assert error.data == {}
    
    def test_api_error_different_status_codes(self):
        """Test ApiError with different HTTP status codes"""
        errors = [
            ApiError("Bad Request", 400),
            ApiError("Unauthorized", 401),
            ApiError("Forbidden", 403),
            ApiError("Not Found", 404),
            ApiError("Internal Server Error", 500),
        ]
        
        assert errors[0].status == 400
        assert errors[1].status == 401
        assert errors[2].status == 403
        assert errors[3].status == 404
        assert errors[4].status == 500
    
    def test_api_error_inheritance(self):
        """Test that ApiError properly inherits from Exception"""
        error = ApiError("Test", 400)
        
        assert isinstance(error, Exception)
        assert hasattr(error, '__str__')
        assert hasattr(error, '__repr__')


class TestValidationError:
    """Test cases for ValidationError class"""
    
    def test_validation_error_with_message(self):
        """Test ValidationError creation with message only"""
        error = ValidationError("Validation failed")
        
        assert isinstance(error, Exception)
        assert isinstance(error, ValidationError)
        assert error.message == "Validation failed"
        assert error.validation_errors == {}
        assert str(error) == "Validation failed"
    
    def test_validation_error_with_message_and_errors(self):
        """Test ValidationError creation with message and validation errors"""
        validation_errors = {
            "email": "Invalid email format",
            "password": "Password too short"
        }
        error = ValidationError("Multiple validation errors", validation_errors)
        
        assert error.message == "Multiple validation errors"
        assert error.validation_errors == validation_errors
    
    def test_validation_error_with_none_errors(self):
        """Test ValidationError creation with None errors defaults to empty dict"""
        error = ValidationError("Test error", None)
        
        assert error.validation_errors == {}
    
    def test_validation_error_with_nested_errors(self):
        """Test ValidationError with nested validation errors"""
        validation_errors = {
            "user": {
                "name": "Required field",
                "contact": {
                    "email": "Invalid format",
                    "phone": "Invalid format"
                }
            }
        }
        error = ValidationError("Nested validation errors", validation_errors)
        
        assert error.validation_errors == validation_errors
        assert error.validation_errors["user"]["contact"]["email"] == "Invalid format"
    
    def test_validation_error_inheritance(self):
        """Test that ValidationError properly inherits from Exception"""
        error = ValidationError("Test")
        
        assert isinstance(error, Exception)
        assert hasattr(error, '__str__')
        assert hasattr(error, '__repr__') 