/**
 * Standardized API message constants
 * Organized by domain and response type
 */
export const HttpMessage = {
  // Success Messages (2xx)
  SUCCESS: {
    DEFAULT: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Resource retrieved successfully',
    LOGIN: 'Login successful',
    LOGOUT: 'Logout successful',
  },

  // Client Error Messages (4xx)
  CLIENT_ERROR: {
    BAD_REQUEST: 'Invalid request parameters',
    UNAUTHORIZED: 'Authentication required',
    FORBIDDEN: 'Insufficient permissions',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Resource conflict detected',
    VALIDATION_ERROR: 'Validation failed',
    RATE_LIMITED: 'Too many requests',
  },

  // Server Error Messages (5xx)
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
    DATABASE_ERROR: 'Database operation failed',
    THIRD_PARTY_ERROR: 'Third-party service error',
  },

  // Authentication Messages
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_LOCKED: 'Account temporarily locked',
    TOKEN_EXPIRED: 'Session expired',
    TOKEN_INVALID: 'Invalid authentication token',
    PASSWORD_RESET: 'Password reset required',
  },

  // Business Logic Messages
  BUSINESS: {
    INSUFFICIENT_QUOTA: 'Insufficient quota available',
    SUBSCRIPTION_EXPIRED: 'Subscription has expired',
    FEATURE_DISABLED: 'This feature is currently disabled',
  },
} as const;

// Type exports for type-safe usage
export type SuccessMessage = keyof typeof HttpMessage.SUCCESS;
export type ErrorMessage = 
  | keyof typeof HttpMessage.CLIENT_ERROR
  | keyof typeof HttpMessage.SERVER_ERROR
  | keyof typeof HttpMessage.AUTH
  | keyof typeof HttpMessage.BUSINESS;