import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));

      // Use 422 Unprocessable Entity for validation errors
      res.status(422).json({
        status: 'error',
        message: 'Request validation failed. Please check your input and try again.',
        errors
      });
      return;
    }

    req.body = result.data;
    next();
  };
};
