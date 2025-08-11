import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/auth.error';

export const authorize = (roles: string[]) => 
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      throw new UnauthorizedError('Insufficient permissions');
    }
    next();
  };