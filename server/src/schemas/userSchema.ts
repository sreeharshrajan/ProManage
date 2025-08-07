import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().min(0),
  email: z.string().email(),
});

export type UserInput = z.infer<typeof userSchema>;
