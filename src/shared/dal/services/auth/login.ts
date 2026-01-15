'server only';

import type {
  AuthError,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { BaseUserEntity } from '@/shared/dal/entities';

export async function login(
  credentials: SignInWithPasswordCredentials
): Promise<{
  data: BaseUserEntity | null;
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { data: data.user, error };
}
