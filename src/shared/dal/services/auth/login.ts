import 'server-only';

import type {
  AuthError,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { User } from '@/shared/dal/entities';

export async function login(
  credentials: SignInWithPasswordCredentials
): Promise<{
  user: User | null;
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  const camelized = data.user && (objectToCamel(data.user) as User);
  return { user: camelized, error };
}
