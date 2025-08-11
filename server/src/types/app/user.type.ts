import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  active: boolean;
  deleted_at: Date | null;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  softDelete(): Promise<void>;
}

export type UpdateUserPayload = Partial<Pick<IUser, 'name' | 'email' | 'role' | 'active'>>;