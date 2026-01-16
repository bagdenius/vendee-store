import 'server-only';

import type {
  AuthError,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { User } from '@/shared/dal/entities';

export async function signup(
  credentials: SignUpWithPasswordCredentials
): Promise<{
  user: User | null;
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp(credentials);
  const camelized = data.user && (objectToCamel(data.user) as User);
  return { user: camelized, error };
}
