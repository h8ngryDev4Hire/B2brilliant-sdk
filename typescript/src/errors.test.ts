/**
 * Tests for custom errors in the B2B Campaign Agent SDK
 */

import { ApiError, ValidationError } from './errors';

describe('ApiError', () => {
  it('should create ApiError with message and status', () => {
    const error = new ApiError('Test error', 400);
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.message).toBe('Test error');
    expect(error.status).toBe(400);
    expect(error.data).toEqual({});
    expect(error.name).toBe('ApiError');
  });

  it('should create ApiError with message, status, and data', () => {
    const data = { field: 'Invalid value', code: 'VALIDATION_ERROR' };
    const error = new ApiError('Validation failed', 422, data);
    
    expect(error.message).toBe('Validation failed');
    expect(error.status).toBe(422);
    expect(error.data).toEqual(data);
  });

  it('should maintain proper stack trace', () => {
    const error = new ApiError('Stack test', 500);
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('ApiError');
  });

  it('should handle different HTTP status codes', () => {
    const errors = [
      new ApiError('Bad Request', 400),
      new ApiError('Unauthorized', 401),
      new ApiError('Forbidden', 403),
      new ApiError('Not Found', 404),
      new ApiError('Internal Server Error', 500),
    ];

    expect(errors[0].status).toBe(400);
    expect(errors[1].status).toBe(401);
    expect(errors[2].status).toBe(403);
    expect(errors[3].status).toBe(404);
    expect(errors[4].status).toBe(500);
  });
});

describe('ValidationError', () => {
  it('should create ValidationError with message', () => {
    const error = new ValidationError('Validation failed');
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe('Validation failed');
    expect(error.validationErrors).toEqual({});
    expect(error.name).toBe('ValidationError');
  });

  it('should create ValidationError with message and validation errors', () => {
    const validationErrors = {
      email: 'Invalid email format',
      password: 'Password too short'
    };
    const error = new ValidationError('Multiple validation errors', validationErrors);
    
    expect(error.message).toBe('Multiple validation errors');
    expect(error.validationErrors).toEqual(validationErrors);
  });

  it('should maintain proper stack trace', () => {
    const error = new ValidationError('Stack test');
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('ValidationError');
  });

  it('should handle nested validation errors', () => {
    const validationErrors = {
      user: {
        name: 'Required field',
        contact: {
          email: 'Invalid format',
          phone: 'Invalid format'
        }
      }
    };
    const error = new ValidationError('Nested validation errors', validationErrors);
    
    expect(error.validationErrors).toEqual(validationErrors);
    expect(error.validationErrors.user.contact.email).toBe('Invalid format');
  });
}); 