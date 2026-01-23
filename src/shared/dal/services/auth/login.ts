import 'server-only';

import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import type { LoginWithPasswordResult } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function login(
  credentials: SignInWithPasswordCredentials,
): Promise<LoginWithPasswordResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) return { error };
  return { data: objectToCamel(data) };
}
