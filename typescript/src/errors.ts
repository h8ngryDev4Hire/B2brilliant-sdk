/**
 * Custom errors for the B2B Campaign Agent SDK
 */

/**
 * API Error class for handling API request errors
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly data: Record<string, any>;

  /**
   * Create a new API error
   * 
   * @param message - Error message
   * @param status - HTTP status code
   * @param data - Additional error data
   */
  constructor(message: string, status: number, data: Record<string, any> = {}) {
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
export class ValidationError extends Error {
  public readonly validationErrors: Record<string, any>;

  /**
   * Create a new validation error
   * 
   * @param message - Error message
   * @param validationErrors - Validation errors
   */
  constructor(message: string, validationErrors: Record<string, any> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}
