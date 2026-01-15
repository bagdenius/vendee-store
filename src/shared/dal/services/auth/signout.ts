'server only';

import { AuthError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function signout(): Promise<{ error: AuthError | null }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}
