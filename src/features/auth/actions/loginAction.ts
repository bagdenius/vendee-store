'use server';

import { login } from '@/shared/dal/services/auth/login';
import { loginSchema, type LoginSchema } from '../schemas/signInSchema';

export async function loginAction(formData: LoginSchema) {
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    const validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  const { user, error: loginError } = await login(result.data);
  return { user, loginError };
}
