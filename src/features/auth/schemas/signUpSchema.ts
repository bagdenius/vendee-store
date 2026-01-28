import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(2, 'Please enter your first name').max(256),
    lastName: z.string().min(2, 'Please enter your last name').max(256),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords should match',
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
