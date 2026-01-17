'use server';

import { login } from '@/shared/dal/services/auth/login';
import { loginSchema, type LoginSchema } from '../schemas/signInSchema';

export async function loginAction(formData: LoginSchema) {
  let validationErrors;
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    validationErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { validationErrors };
  }
  const { error: loginError } = await login(result.data);
  return { loginError, validationErrors };
}
