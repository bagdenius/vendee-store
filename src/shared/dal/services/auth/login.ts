import 'server-only';

import type {
  AuthError,
  SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import type { User } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';

export async function login(
  credentials: SignInWithPasswordCredentials,
): Promise<Result<User, AuthError>> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) return err(error);
  const camelized = objectToCamel(data.user);
  return ok(camelized);
}
