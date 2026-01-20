import 'server-only';

import {
  AuthError,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import type { SignupResult } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';

export async function signup(
  credentials: SignUpWithPasswordCredentials,
): Promise<Result<SignupResult, AuthError>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user, session },
    error,
  } = await supabase.auth.signUp(credentials);
  if (error) return err(error);
  if (user && !session) return ok({ user: objectToCamel(user), session: null });
  if (session && !user)
    return ok({ session: objectToCamel(session), user: null });
  return err(new AuthError('Unexpected signup response shape'));
}
