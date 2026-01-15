'server-only';

import type { PostgrestError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { ProfileInsertEntity } from '@/shared/data/entities';

export async function createProfile(
  profile: ProfileInsertEntity
): Promise<PostgrestError | null> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('profiles').insert(profile);
  return error;
}
