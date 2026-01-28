'use server';

import { login } from '@/shared/dal/services/auth/login';
import { loginSchema, type LoginSchema } from '../schemas/loginSchema';

export async function loginAction(formData: LoginSchema) {
  const validationResult = loginSchema.safeParse(formData);
  if (!validationResult.success) {
    const validationErrors = Object.fromEntries(
      validationResult.error.issues.map((issue) => [
        issue.path[0],
        issue.message,
      ]),
    );
    return { validationErrors };
  }
  const credentials = validationResult.data;
  const { data, error: loginError } = await login(credentials);
  if (loginError) {
    const message =
      loginError.code === 'invalid_credentials'
        ? 'Invalid email or password'
        : 'An error occured while signing in';
    return { loginError: { message } };
  }
  return {
    user: data.user,
    session: data.session,
    weakPassword: data.weakPassword,
  };
}
