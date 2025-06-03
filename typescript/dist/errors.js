"use strict";
/**
 * Custom errors for the B2B Campaign Agent SDK
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ApiError = void 0;
/**
 * API Error class for handling API request errors
 */
class ApiError extends Error {
    /**
     * Create a new API error
     *
     * @param message - Error message
     * @param status - HTTP status code
     * @param data - Additional error data
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
exports.ApiError = ApiError;
/**
 * Validation Error class for handling input validation errors
 */
class ValidationError extends Error {
    /**
     * Create a new validation error
     *
     * @param message - Error message
     * @param validationErrors - Validation errors
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
exports.ValidationError = ValidationError;
