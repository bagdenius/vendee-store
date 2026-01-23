import 'server-only';

import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { SignupResult } from '../../entities';

export async function signup(
  credentials: SignUpWithPasswordCredentials,
): Promise<SignupResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp(credentials);
  if (error) return { error };
  return { data: objectToCamel(data) };
}
