'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { login } from '@/shared/data/services/auth/login';

import { loginSchema, LoginSchema } from '../models';

export async function loginAction(formData: LoginSchema) {
  // validation
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  // sign in
  const { error: loginError } = await login(result.data);
  // error handle
  if (loginError) {
    console.error(`Failed to sign in: ${loginError.message}`);
    if (loginError.code === 'invalid_credentials')
      return {
        loginError: new Error('Invalid email or/and password'),
      };
    return { loginError };
  }
  // revalidate/redirect
  revalidatePath('/', 'layout');
  redirect('/');
}
