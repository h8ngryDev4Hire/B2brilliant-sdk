/**
 * Custom errors for the B2B Campaign Agent SDK
 */

/**
 * API Error class for handling API request errors
 */
class ApiError extends Error {
  /**
   * Create a new API error
   * 
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   * @param {Object} data - Additional error data
   */
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Validation Error class for handling input validation errors
 */
class ValidationError extends Error {
  /**
   * Create a new validation error
   * 
   * @param {string} message - Error message
   * @param {Object} validationErrors - Validation errors
   */
  constructor(message, validationErrors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

module.exports = {
  ApiError,
  ValidationError
}; 