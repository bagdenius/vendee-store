import 'server-only';

import { objectToCamel, objectToSnake } from 'ts-case-convert';

import type { ProfileInsert } from '@/shared/dal/entities';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';

export async function createProfile(profile: ProfileInsert) {
  const supabase = await createSupabaseServerClient();
  const data = await supabase.from('profiles').insert(objectToSnake(profile));
  if (data.error) return { error: data.error };
  return { data: objectToCamel(data) };
}
