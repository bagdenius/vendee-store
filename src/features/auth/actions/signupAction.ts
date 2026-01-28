'use server';

import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

import { signup } from '@/shared/dal/services/auth/signup';
import { signupSchema, type SignupSchema } from '../schemas/signUpSchema';

export async function signupAction(formData: SignupSchema) {
  const result = signupSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message]),
    );
    return { validationErrors };
  }
  const credentials: SignUpWithPasswordCredentials = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        role: 'user',
      },
    },
  };
  const { data, error: signupError } = await signup(credentials);
  if (signupError) {
    console.log(signupError);
    const message =
      signupError.code === 'user_already_exists'
        ? 'User already registered'
        : 'An error occured while signing up';
    return { signupError: { message } };
  }
  return { user: data.user, session: data.session };
}
