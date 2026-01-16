import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { ProfileInsertEntity } from '@/shared/dal/entities';

export async function createProfile(
  profile: ProfileInsertEntity
): Promise<{ error: PostgrestError | null }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('profiles').insert(profile);
  return { error };
}
