import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  role: z.enum(['user', 'admin']).optional(),
  active: z.boolean().optional()
}).strict();