import { UserModel } from '../models/user.model';
import { AppError } from '../errors/app.error';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth/jwt.util';
import { logger } from '../utils/logger.util';

export class UserService {
  static async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    // Check if email already exists
    if (await UserModel.findOne({ email: userData.email })) {
      throw new AppError('Email already in use', 400);
    }

    // Create user
    const user = await UserModel.create(userData);
    return user.toJSON();
  }

  static async login(email: string, password: string) {
    // 1. Validate input
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // 2. Check if user exists
    const user = await UserModel.findOne({ email }).select('+password +active');
    
    // 3. Verify user exists and is active
    if (!user || !user.active) {
      throw new AppError('Invalid credentials', 401);
    }

    // 4. Verify password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // 5. Generate token
    const token = generateToken(user._id.toString(), user.role);

    // 6. Remove sensitive data
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.active;

    return { token, user: userWithoutPassword };
  }

  static async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user.toJSON();
  }

  static async getAllUsers() {
    return await UserModel.find().select('-password');
  }

  static async getUserById(id: string) {
    const user = await UserModel.findById(id).select('-password');
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  static async updateUser(id: string, updateData: any) {
    // Prevent password updates via this method
    if (updateData.password) {
      throw new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400
      );
    }

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  static async deleteUser(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new AppError('User not found', 404);
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await UserModel.findById(userId).select('+password');
    if (!user) throw new AppError('User not found', 404);

    // 2. Check if current password is correct
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      throw new AppError('Your current password is wrong', 401);
    }

    // 3. Update password
    user.password = newPassword;
    await user.save();

    // 4. Log user in, send new JWT
    const token = generateToken(user._id.toString(), user.role);
    return { token };
  }
}