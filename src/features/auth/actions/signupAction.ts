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
        full_name: formData.fullName,
      },
    },
  };
  const { data, error: signupError } = await signup(credentials);
  if (signupError) return { signupError };
  return { user: data.user, session: data.session };
}
