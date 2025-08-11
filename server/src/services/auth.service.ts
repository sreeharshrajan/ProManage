import { User } from '../models/user.model';
import { UserPayload } from '../types/api/auth';
import { UnauthorizedError } from '../errors/auth.error';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  user: Omit<UserPayload, 'password'>;
  token: string;
}

export class AuthService {
  static async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new UnauthorizedError('Invalid email or password');

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new UnauthorizedError('Invalid email or password');

    // JWT payload
    const payload: UserPayload = {
      id: (user._id as Types.ObjectId).toHexString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Sign token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return { user: payload, token };
  }
}
