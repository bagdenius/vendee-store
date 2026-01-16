import 'server-only';

import type { PostgrestError } from '@supabase/supabase-js';
import { objectToCamel } from 'ts-case-convert';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

import type { Profile } from '@/shared/dal/entities';

export async function getProfileById(id: string): Promise<{
  profile: Profile | null;
  error: PostgrestError | null;
}> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  const camelized = data && (objectToCamel(data) as Profile);
  return { profile: camelized, error };
}
