import 'server-only';

import type {
  AuthError,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';
import type { OAuthResult } from '../../entities';

export async function loginWithProvider(
  credentials: SignInWithOAuthCredentials,
): Promise<Result<OAuthResult, AuthError>> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth(credentials);
  if (error) return err(error);
  return ok(data);
}
