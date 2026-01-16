import 'server-only';

import type { AuthError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { BaseUserEntity } from '@/shared/dal/entities';

export async function getUser(): Promise<{
  data: BaseUserEntity | null;
  error: AuthError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  return { data: data.user, error };
}
