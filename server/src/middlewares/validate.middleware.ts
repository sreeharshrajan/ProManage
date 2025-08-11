import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.issues, // ✅ use `issues` instead of `errors`
      });
      return; // ✅ end execution explicitly
    }

    req.body = result.data;
    next();
  };
};
