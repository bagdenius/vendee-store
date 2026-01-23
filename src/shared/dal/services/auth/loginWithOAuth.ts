import 'server-only';

import type { SignInWithOAuthCredentials } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { OAuthResult } from '../../entities';

export async function loginWithOAuth(
  credentials: SignInWithOAuthCredentials,
): Promise<OAuthResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth(credentials);
  if (error) return { error };
  return { data };
}
