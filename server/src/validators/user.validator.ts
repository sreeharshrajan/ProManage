import { RequestHandler } from 'express';
import { UserZodSchema, PartialUserZodSchema } from '../schemas/user.schema';
import { AppError } from '../errors/app.error';
import { logger } from '../utils/logger.util';

// Extend Express Request interface to include validatedData
declare module 'express-serve-static-core' {
  interface Request {
    validatedData?: any;
  }
}

interface ValidationError {
  field: string;
  message: string;
}

const formatZodError = (zodError: any): ValidationError[] => {
  if (!zodError || !zodError.errors) return [];
  
  return zodError.errors.map((err: any) => ({
    field: err.path.join('.'),
    message: err.message || 'Validation error'
  }));
};

export const validateUser: RequestHandler = (req, _res, next) => {
  const result = UserZodSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = formatZodError(result.error);
    logger.error(`Validation failed: ${JSON.stringify(errors)}`);
    
    throw new AppError(
      'Validation failed', 
      400, 
      errors.length ? errors : [{ field: 'unknown', message: 'Invalid request data' }]
    );
  }
  
  req.validatedData = result.data;
  next();
};

export const validatePartialUser: RequestHandler = (req, _res, next) => {
  const result = PartialUserZodSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = formatZodError(result.error);
    logger.error(`Partial validation failed: ${JSON.stringify(errors)}`);
    
    throw new AppError(
      'Validation failed', 
      400, 
      errors.length ? errors : [{ field: 'unknown', message: 'Invalid request data' }]
    );
  }
  
  req.validatedData = result.data;
  next();
};