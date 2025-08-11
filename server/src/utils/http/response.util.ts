import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../types/api/response.type';

/**
 * Standardizes API response format according to:
 * - ApiResponse<T> for successful responses
 * 
 * @example Success
 * {
 *   status: 'success',
 *   data: T,
 *   timestamp: string,
 *   requestId?: string
 * }
 */
export const responseFormatter = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function <T>(body: T) {
      // Skip formatting if already formatted or is error response
      if (body && typeof body === 'object' && ('status' in body || 'error' in body)) {
        return originalJson.call(this, body);
      }

      const response: ApiResponse<T> = {
        status: 'success',
        data: body,
        timestamp: new Date().toISOString(),
        ...(req.requestId && { requestId: req.requestId })
      };

      return originalJson.call(this, response);
    };

    next();
  };
};