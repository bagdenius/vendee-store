import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { ProfileInsert } from '@/shared/dal/entities';

// WARNING: I THINK PROFILE SHOULD BE SNAKELIZED
export async function createProfile(
  profile: ProfileInsert
): Promise<{ error: PostgrestError | null }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('profiles').insert(profile);
  return { error };
}
