import { User } from '../models/user.model';
import { IUserDocument, UpdateUserPayload } from '../types/app/user.type';

export class UserService {
  static async getAllUsers(): Promise<IUserDocument[]> {
    return User.find().select('-password');
  }

  static async getUserById(id: string): Promise<IUserDocument | null> {
    return User.findById(id).select('-password');
  }

  static async updateUser(
    id: string,
    data: UpdateUserPayload
  ): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select('-password');
  }

  static async deleteUser(id: string): Promise<IUserDocument | null> {
    return User.findByIdAndDelete(id).select('-password');
  }
}