'server only';

import type {
  AuthError,
  Session,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { BaseUserEntity } from '@/shared/dal/entities';

export async function signup(
  credentials: SignUpWithPasswordCredentials
): Promise<{
  data: {
    user: BaseUserEntity | null;
    session: Session | null;
  };
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp(credentials);
  return { data, error };
}
