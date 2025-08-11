import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { AppError } from '../../errors/app.error';

export const generateToken = (userId: string, role?: string): string => {
  const secret = process.env.JWT_SECRET as Secret | undefined;
  if (!secret) {
    throw new AppError('JWT secret not configured', 500);
  }

  const expiresIn: SignOptions['expiresIn'] =
    (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '90d';

  return jwt.sign(
    { id: userId, role },
    secret,
    { expiresIn }
  );
};
