'use server';

import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { objectToCamel } from 'ts-case-convert';

import { signup } from '@/shared/dal/services/auth/signup';
import { createProfileFromUserAction } from './createProfileFromUserAction';

import { signupSchema, SignupSchema } from '../models';

export async function signupAction(formData: SignupSchema) {
  // server validation
  const result = signupSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  // build credentials
  const credentials: SignUpWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.email,
        full_name: formData.fullName,
        email: formData.email,
        role: 'user',
        avatar: '',
      },
    },
  };
  // sign up
  const { data, error: signupError } = await signup(credentials);
  // signup error handle
  if (signupError) throw new Error(`Failed to sign up: ${signupError.message}`);
  if (!data.user) throw new Error('Failed to get user while signing up');
  // camelize and shit
  const user = objectToCamel(data.user);
  // create user profile
  await createProfileFromUserAction(user);
  // revalidate/redirect
  revalidatePath('/', 'layout');
  redirect('/');
}
