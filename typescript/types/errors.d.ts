/**
 * Custom errors for the B2B Campaign Agent SDK
 */
/**
 * API Error class for handling API request errors
 */
export declare class ApiError extends Error {
    readonly status: number;
    readonly data: Record<string, any>;
    /**
     * Create a new API error
     *
     * @param message - Error message
     * @param status - HTTP status code
     * @param data - Additional error data
     */
    constructor(message: string, status: number, data?: Record<string, any>);
}
/**
 * Validation Error class for handling input validation errors
 */
export declare class ValidationError extends Error {
    readonly validationErrors: Record<string, any>;
    /**
     * Create a new validation error
     *
     * @param message - Error message
     * @param validationErrors - Validation errors
     */
    constructor(message: string, validationErrors?: Record<string, any>);
}
