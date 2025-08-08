export interface FormattedResponse<T = unknown> {
  status: 'success' | 'fail';
  data: T;
  timestamp: string;
  requestId?: string;
}

// For error responses
export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
  timestamp: string;
  requestId?: string;
  stack?: string; // Only in development
}