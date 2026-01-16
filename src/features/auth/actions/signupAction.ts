'use server';

import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signup } from '@/shared/dal/services/auth/signup';
import { signupSchema, type SignupSchema } from '../schemas/signUpSchema';

export async function signupAction(formData: SignupSchema) {
  // server validation
  const result = signupSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  // build sign up credentials
  const credentials: SignUpWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
  };
  // sign up
  const { user, error: signupError } = await signup(credentials);
  // signup error handle
  if (signupError) return { error: signupError };
  if (!user) throw new Error('Failed to get user while signing up');
  // revalidate/redirect - MOVE TO CLIENT ROUTER
  revalidatePath('/', 'layout');
  redirect('/');
}
