import { z } from 'zod';
import { UserZodSchema } from '../schemas/user.schema';

export interface User extends z.infer<typeof UserZodSchema> {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SanitizedUser = Omit<User, 'password' | 'deleted_at'>;
export type UserCreateInput = z.infer<typeof UserZodSchema>;
export type UserUpdateInput = Partial<UserCreateInput>;