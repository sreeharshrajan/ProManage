import { Request, Response, NextFunction } from 'express';
import { AppError } from './app.error';
import { logger } from '../utils/logger.util';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body
  });

  // Handle validation errors
  if (err instanceof AppError && err.details) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: 'Validation error',
      errors: err.details,
      timestamp: new Date().toISOString()
    });
  }

  // Handle other operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    timestamp: new Date().toISOString()
  });
};
