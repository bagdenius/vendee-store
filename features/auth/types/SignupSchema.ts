import { z } from 'zod';

export const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Please enter your full name').max(256),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords should match',
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
