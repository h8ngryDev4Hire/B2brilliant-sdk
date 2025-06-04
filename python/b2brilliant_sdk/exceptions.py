"""
Custom exceptions for the B2B Campaign Agent SDK
"""

class ApiError(Exception):
    """API Error class for handling API request errors"""
    
    def __init__(self, message, status, data=None):
        """
        Create a new API error
        
        Args:
            message (str): Error message
            status (int): HTTP status code
            data (dict, optional): Additional error data
        """
        super().__init__(message)
        self.message = message
        self.status = status
        self.data = data or {}


class ValidationError(Exception):
    """Validation Error class for handling input validation errors"""
    
    def __init__(self, message, validation_errors=None):
        """
        Create a new validation error
        
        Args:
            message (str): Error message
            validation_errors (dict, optional): Validation errors
        """
        super().__init__(message)
        self.message = message
        self.validation_errors = validation_errors or {} 