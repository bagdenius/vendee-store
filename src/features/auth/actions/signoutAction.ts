'use server';

import { signout } from '@/shared/dal/services/auth/signout';
import { AuthError } from '@supabase/supabase-js';

export async function signoutAction(): Promise<{ error?: AuthError }> {
  const { error } = await signout();
  if (error) return { error };
  return { error: undefined };
}
