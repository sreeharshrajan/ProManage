import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger.util';

type AsyncHandler<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

/**
 * Wraps async route handlers with error handling
 * and success logging
 */
export const asyncHandler = <T>(fn: AsyncHandler<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
      logger.info(`Success: ${req.method} ${req.originalUrl}`);
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Specialized handler for data-returning controllers
 * Automatically sends JSON response
 */
export const dataHandler = <T>(fn: AsyncHandler<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Handler for endpoints with no return data (just success status)
 */
export const actionHandler = (fn: AsyncHandler<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
      res.status(200).json({ status: 'success' });
    } catch (err) {
      next(err);
    }
  };
};