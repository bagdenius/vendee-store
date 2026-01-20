import 'server-only';

import { AuthError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { err, ok, type Result } from '@/shared/types/result';

export async function signout(): Promise<Result<AuthError>> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) return err(error);
  return ok();
}
