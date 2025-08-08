import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const UserZodSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z.string()
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(passwordRegex, { 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }),
  role: z.enum(['user', 'admin'])
    .optional()
    .default('user')
}).strict();

export const PartialUserZodSchema = UserZodSchema.partial()
  .omit({ password: true })
  .extend({
    role: z.enum(['user', 'admin']).optional()
  });

export type UserInput = z.infer<typeof UserZodSchema>;
export type PartialUserInput = z.infer<typeof PartialUserZodSchema>;