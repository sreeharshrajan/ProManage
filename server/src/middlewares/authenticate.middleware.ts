import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/auth.error';
import { UserPayload } from '../types/api/auth';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError(
        'Authorization header missing or malformed. Expected format: Bearer <token>'
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Token not provided in Authorization header');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'string') {
      throw new UnauthorizedError('Invalid token payload format');
    }

    req.user = decoded as UserPayload;
    next();
  } catch (err) {
    next(err);
  }
};
