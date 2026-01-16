import 'server-only';

import type {
  AuthError,
  Provider,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function loginWithProvider(
  credentials: SignInWithOAuthCredentials
): Promise<{
  data: {
    provider: Provider;
    url: string | null;
  };
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth(credentials);
  return { data, error };
}
