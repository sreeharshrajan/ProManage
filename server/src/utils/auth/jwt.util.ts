import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/app.error';

export const generateToken = (userId: string, role?: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new AppError('JWT secret not configured', 500);
  }

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '90d' }
  );
};